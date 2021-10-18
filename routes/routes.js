const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.js')
const hasRole = require('../middleware/authorize.js')

router.use(express.json()) //this line activates the bodyparser middleware
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.send('This is homepage!')
})

router.get('/create', (req, response) => {
  console.log(req.body)
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
    return res.status(201).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error.')
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
    })

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      })

      // save user token
      user.dataValues.token = token

      // user
      res.status(200).json(user)
    } else {
      res.status(400).send('Invalid Credentials')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Intedrnal Server Error.')
  }
})
router.get('/welcome', auth, hasRole('client'), async (req, res) => {
  res.status(200).send('Welcome 🙌, your role is: ' + req.user.role)
})

router.post('/reservation', async (req, res) => {})

module.exports = router
