const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../../models/user.model')

const login = async (req, res) => {
  try {
    console.log(req.body)
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
    return res.status(500).send('Internal Server Error.')
  }
}

module.exports = login
