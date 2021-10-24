const express = require('express')
const commonRouter = express.Router()

// middleware
const register = require('../middleware/common/register')
const login = require('../middleware/common/login')

// urlencoded
commonRouter.use(express.json())
commonRouter.use(express.urlencoded({ extended: true }))

// for testing purpose
commonRouter.get('/', (req, res) => {
  res.send('This is homepage!')
})

// register user after providing firstname, lastname, email, phone, password
commonRouter.post('/register', register)

commonRouter.post('/login', login)

module.exports = commonRouter
