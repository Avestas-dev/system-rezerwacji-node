const Reservation = require('../../models/reservation.model')

// duration is in minutes
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) {
      return res.status(400).send('Niepoprawnie lub nieokreślone id usuwanej rezerwacji.')
    }
    Reservation.destroy({
      where: {
        id: id,
      },
    })
    return res.status(200).send('Rezerwacja usunięta pomyślnie.')
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

module.exports = deleteReservation
