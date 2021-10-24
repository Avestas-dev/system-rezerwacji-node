const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const Reservation = require('../models/reservation.model')
const SpecialistJob = require('../models/specialist_job.model')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.js')
const hasRole = require('../middleware/authorize.js')
const getUserByEmail = require('../utils/getUserByEmail')

router.use(express.json()) //this line activates the bodyparser middleware
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.send('This is homepage!')
})

router.post('/register', async (req, res) => {
  try {
    // console.log(req.body)
    const { firstName, lastName, email, password, phone } = req.body
    if (!(email && password && firstName && lastName && phone)) {
      return res.status(400).send('All input is required')
    }
    const oldUser = await User.findOne({
      where: {
        email: email,
      },
    })

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login')
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      phone,
      role: 'client',
    })
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: '999h',
    })
    user.dataValues.token = token
    return res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: token,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error.')
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      return res.status(400).send('All input is required')
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role', 'password'],
    })
    if (user && (await bcrypt.compare(password, user.dataValues.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: '9999h',
      })

      // save user token
      user.dataValues.token = token
      delete user.dataValues.password

      // user
      return res.status(200).json(user)
    } else {
      return res.status(400).send('Invalid Credentials')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Intedrnal Server Error.')
  }
})

router.get('/user-by-token', auth, async (req, res) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.headers['authorization']
    if (req?.user) req.user.dataValues.token = token

    return res.status(200).json(req.user)
  } catch (err) {
    console.log(err)
  }
})

// get all users with role specialist
router.get('/specialists', auth, async (req, res) => {
  try {
    let specialists = await SpecialistJob.findAll({
      // where: { role: 'specialist' },
      include: [{ model: User, attributes: ['firstName', 'lastName'] }],

      attributes: ['userId', 'jobName'],
    }).then((res) => res.map((specialist) => specialist.dataValues))
    return res.status(200).send(specialists)
  } catch (err) {
    return res.status(500).send('Internal server error.')
  }
})

// get all reservations for given specialist id
router.get('/reservation/:id', auth, async (req, res) => {
  try {
    let specialistId = req.params.id
    let reservations = await Reservation.findAll({
      where: {
        specialist_id: specialistId,
      },
      attributes: [
        'id',
        'name',
        'client_id',
        'specialist_id',
        'reservation_status',
        'reservation_timestamp',
        'datetime_start',
        'datetime_end',
      ],
    }).then((res) => res.map((reservation) => reservation.dataValues))
    return res.status(200).send(reservations)
  } catch (err) {
    return res.status(500).send('Internal server error.')
  }
})

router.post('/reservation', auth, hasRole('specialist'), async (req, res) => {
  try {
    const { name, datetime_start, datetime_end } = req.body
    if (!(name && datetime_start && datetime_end)) {
      return res.status(400).send('All inputs are required.')
    }
    //TODO: add validation check, if in given reservation range there is no other visit
    //TODO: add validation if datetime_start is bigger than datetime_end
    Reservation.create({
      name: name,
      specialist_id: req.user.id,
      reservation_status: 'free',
      datetime_start: datetime_start,
      datetime_end: datetime_end,
    })
    return res.status(200).send('Reservation created successfully.')
  } catch (err) {
    console.err(err)
    return res.status(500).send(err)
  }
})

// change role of specialist with given id
router.put('/role', auth, hasRole('owner'), async (req, res) => {
  try {
    const { role, userId } = req.body
    if (role !== 'client' && role !== 'specialist') {
      return res.status(400).send('Role must be client or specialist.')
    }
    await User.update(
      { role: role },
      {
        where: {
          id: userId,
          [Op.not]: { role: 'owner' },
        },
      },
    )
    return res.status(200).send('User role updated successfully.')
  } catch (err) {
    console.err(err)
    return res.status(500).send(err)
  }
})

// reserve visit
router.put('/reserve', auth, async (req, res) => {
  try {
    const { reservationId } = req.body
    await Reservation.update(
      { reservation_status: 'reserved', client_id: req.user.id },
      {
        where: {
          id: reservationId,
          reservation_status: 'free',
        },
      },
    )
    return res.status(200).send('Reservation done successfully.')
  } catch (err) {
    console.err(err)
    return res.status(500).send(err)
  }
})

// cancel reservation
router.put('/cancel-reservation', auth, hasRole('specialist'), async (req, res) => {
  try {
    const { reservationId } = req.body

    await Reservation.update(
      { reservation_status: 'free', client_id: null },
      {
        where: {
          id: reservationId,
          specialist_id: req.user.id,
        },
      },
    )
    return res.status(200).send('Reservation done successfully.')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

module.exports = router
