const Reservation = require('../../models/reservation.model')
const { Op } = require('sequelize')

// duration is in minutes
const cancelReservation = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) {
      return res.status(400).send('Niepoprawnie lub nieokreślone id anulowanej rezerwacji.')
    }
    Reservation.update(
      {
        reservation_status: 'free',
        reservation_timestamp: null,
        client_id: null,
      },
      {
        where: {
          [Op.and]: { id: id, specialist_id: req.user.id },
        },
      },
    )
    return res.status(200).send('Rezerwacja anulowana 0pomyślnie.')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

module.exports = cancelReservation
