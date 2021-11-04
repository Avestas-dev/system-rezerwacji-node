const Reservation = require('../../models/reservation.model')
const cancelReservation = async (req, res) => {
  try {
    const { id } = req.body

    Reservation.update(
      { reservation_status: 'free', client_id: null, reservation_timestamp: null },
      {
        where: {
          id: id,
          client_id: req.user.id,
        },
      },
    )
    return res.status(200).send('Rezerwacja anulowana pomyślnie.')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}
module.exports = cancelReservation
