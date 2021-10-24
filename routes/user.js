const express = require('express')
const userRouter = express.Router()

// middleware
const auth = require('../middleware/common/auth.js')
const authorize = require('../middleware/common/authorize.js')

const getUserByToken = require('../middleware/user/getUserByToken.js')
const getAllSpecialists = require('../middleware/user/getAllSpecialists.js')
const getAllReservationBySpecialistId = require('../middleware/user/getAllReservationBySpecialistId.js')
const cancelReservation = require('../middleware/user/cancelReservation.js')
const reserveVisit = require('../middleware/user/reserveVisit.js')

const User = require('../models/user.model')
const SpecialistJob = require('../models/specialist_job.model')
const Reservation = require('../models/reservation.model')

userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }))

// get user from token
userRouter.get('/user-by-token', auth, getUserByToken)

// get all users with role specialist
userRouter.get('/specialists', auth, getAllSpecialists)

// get all reservations for given specialist id
userRouter.get('/reservation/:id', auth, getAllReservationBySpecialistId)

// cancel reservation
userRouter.put('/cancel-reservation', auth, authorize('specialist'), cancelReservation)

// reserve visit
userRouter.put('/reserve', auth, reserveVisit)

module.exports = userRouter
