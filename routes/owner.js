const express = require('express')
const ownerRouter = express.Router()

// urlencoded
ownerRouter.use(express.json())
ownerRouter.use(express.urlencoded({ extended: true }))

// middleware
const auth = require('../middleware/common/auth.js')
const authorize = require('../middleware/common/authorize.js')
const changeRole = require('../middleware/owner/changeRole.js')

// change role of specialist with given id
ownerRouter.put('/role', auth, authorize('owner'), changeRole)

module.exports = ownerRouter
