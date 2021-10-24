const express = require('express')
const specialistRouter = express.Router()
const auth = require('../middleware/common/auth.js')
const authorize = require('../middleware/common/authorize.js')
const Reservation = require('../models/reservation.model')

specialistRouter.use(express.json())
specialistRouter.use(express.urlencoded({ extended: true }))
// create reservation
specialistRouter.post('/reservation', auth, authorize('specialist'), async (req, res) => {
  try {
    const { name, datetime_start, datetime_end } = req.body
    if (!(name && datetime_start && datetime_end)) {
      return res.status(400).send('All inputs are required.')
    }
    //TODO: add validation check, if in given reservation range there is no other visit
    //TODO: add validation if datetime_start is bigger than datetime_end
    Reservation.create({
      name: name,
      specialist_id: req.user.id,
      reservation_status: 'free',
      datetime_start: datetime_start,
      datetime_end: datetime_end,
    })
    return res.status(200).send('Reservation created successfully.')
  } catch (err) {
    console.err(err)
    return res.status(500).send(err)
  }
})

module.exports = specialistRouter
