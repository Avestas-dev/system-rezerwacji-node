const Reservation = require('../../models/reservation.model')
const reserveVisit = async (req, res) => {
  try {
    const { reservationId } = req.body
    await Reservation.update(
      { reservation_status: 'reserved', client_id: req.user.id },
      {
        where: {
          id: reservationId,
          reservation_status: 'free',
        },
      },
    )
    return res.status(200).send('Reservation done successfully.')
  } catch (err) {
    console.err(err)
    return res.status(500).send(err)
  }
}
module.exports = reserveVisit
