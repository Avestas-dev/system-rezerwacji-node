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
userRouter.put('/cancel-reservation', authorize('specialist'), cancelReservation)

// reserve visit
userRouter.put('/reserve', reserveVisit)

module.exports = userRouter
