const Reservation = require('../../models/reservation.model')
const reserveVisit = async (req, res) => {
  try {
    const { id } = req.body
    Reservation.update(
      { reservation_status: 'reserved', client_id: req.user.id },
      {
        where: {
          id: id,
          reservation_status: 'free',
        },
      },
    )
    return res.status(200).send('Rezerwacja wykonana pomyślnie')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}
module.exports = reserveVisit
