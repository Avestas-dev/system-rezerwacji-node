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
const getWeekReservationBySpecialistId = require('../middleware/user/getWeekReservationBySpecialistId.js')
const getUserReservations = require('../middleware/user/getUserReservations.js')

// urlencoded
userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }))

// auth
userRouter.use(auth)

// get user from token
userRouter.get('/user-by-token', getUserByToken)

// get all users with role specialist
userRouter.get('/specialists', getAllSpecialists)

// get all reservations for given specialist id
userRouter.get('/reservation/:id', getAllReservationBySpecialistId)

// cancel reservation
userRouter.put('/cancel-user-reservation', cancelReservation)

// reserve visit
userRouter.put('/reserve', reserveVisit)

// get weekly reservation by id and offset
userRouter.get('/week-reservation/:id/:offset', getWeekReservationBySpecialistId)

// get all reservations for given user
userRouter.get('/all-user-reservations', getUserReservations)

module.exports = userRouter
