const Reservation = require('../../models/reservation.model')

// duration is in minutes
const createReservation = async (req, res) => {
  try {
    const { name, datetime_start, duration } = req.body
    if (!(name && datetime_start && duration)) {
      return res.status(400).send('All inputs are required.')
    }
    const startDate = new Date(datetime_start)
    //TODO: add validation check, if in given reservation range there is no other visit
    //TODO: add validation if datetime_start is bigger than datetime_end
    Reservation.create({
      name: name,
      specialist_id: req.user.id,
      reservation_status: 'free',
      datetime_start: startDate,
      datetime_end: new Date(
        new Date(datetime_start).setHours(
          startDate.getHours(),
          startDate.getMinutes() + duration,
          startDate.getSeconds(),
        ),
      ),
    })
    return res.status(200).send('Reservation created successfully.')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

module.exports = createReservation
