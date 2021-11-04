const express = require('express')
const specialistRouter = express.Router()

// middleware
const auth = require('../middleware/common/auth.js')
const authorize = require('../middleware/common/authorize.js')
const createReservation = require('../middleware/specialist/createReservation')
const createReservationFromTo = require('../middleware/specialist/createReservationsFromTo')
const deleteReservation = require('../middleware/specialist/deleteReservation')
const cancelReservation = require('../middleware/specialist/cancelReservation')
const deleteReservationsFromTo = require('../middleware/specialist/deleteReservationsFromTo')
const getSpecialistReservation = require('../middleware/specialist/getSpecialistReservation')

// urlencoded
specialistRouter.use(express.json())
specialistRouter.use(express.urlencoded({ extended: true }))

// auth
specialistRouter.use(auth, authorize('specialist'))

// create reservation
specialistRouter.post('/reservation', createReservation)
specialistRouter.post('/reservation-from-to', createReservationFromTo)
specialistRouter.post('/delete-reservation', deleteReservation)
specialistRouter.post('/cancel-reservation', cancelReservation)
specialistRouter.post('/delete-reservation-from-to', deleteReservationsFromTo)
specialistRouter.get('/specialist-vists/:offset', getSpecialistReservation)

module.exports = specialistRouter
