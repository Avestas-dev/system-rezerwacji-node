const express = require('express')
const ownerRouter = express.Router()

// urlencoded
ownerRouter.use(express.json())
ownerRouter.use(express.urlencoded({ extended: true }))

// middleware
const auth = require('../middleware/common/auth.js')
const authorize = require('../middleware/common/authorize.js')
const changeRole = require('../middleware/owner/changeRole.js')
const registerSpecialist = require('../middleware/owner/registerSpecialist.js')
const deleteSpecialist = require('../middleware/owner/deleteSpecialist.js')

ownerRouter.use(auth, authorize('owner'))

// change role of specialist with given id
ownerRouter.put('/role', changeRole)

ownerRouter.post('/add-specialist', registerSpecialist)

ownerRouter.delete('/specialist/:userId', deleteSpecialist)

module.exports = ownerRouter
