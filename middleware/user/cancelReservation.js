const Reservation = require('../../models/reservation.model')
const cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.body

    await Reservation.update(
      { reservation_status: 'free', client_id: null },
      {
        where: {
          id: reservationId,
          specialist_id: req.user.id,
        },
      },
    )
    return res.status(200).send('Reservation done successfully.')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}
module.exports = cancelReservation
