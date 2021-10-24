const express = require('express')
const specialistRouter = express.Router()

// middleware
const auth = require('../middleware/common/auth.js')
const authorize = require('../middleware/common/authorize.js')
const createReservation = require('../middleware/specialist/createReservation')

// urlencoded
specialistRouter.use(express.json())
specialistRouter.use(express.urlencoded({ extended: true }))

// auth
specialistRouter.use(auth, authorize('specialist'))

// create reservation
specialistRouter.post('/reservation', createReservation)

module.exports = specialistRouter
