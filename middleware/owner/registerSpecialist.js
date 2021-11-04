const bcrypt = require('bcryptjs')

const User = require('../../models/user.model')
const SpecialistJob = require('../../models/specialist_job.model')
const jwt = require('jsonwebtoken')

const registerSpecialist = async (req, res) => {
  try {
    // console.log(req.body)
    const { firstName, lastName, email, password, phone, jobName } = req.body
    if (!(email && password && firstName && lastName && phone && jobName)) {
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

    // TODO: CHECK CASE IF USER IS CREATED, BUT ERROR OCCURED ON USER_JOB
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      phone,
      role: 'specialist',
    })

    const user_job = await SpecialistJob.create({
      userId: user.id,
      jobName: jobName,
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
}
module.exports = registerSpecialist
