const Reservation = require('../../models/reservation.model')
const { Op } = require('sequelize')
const moment = require('moment')

// duration is in minutes
const deleteReservationsFromTo = async (req, res) => {
  try {
    const { date_start, date_end } = req.body

    if (!(date_start && date_end)) {
      return res.status(400).json({ msg: 'Nieprawidłowe daty początku i końca usuwania wizyt' })
    }
    console.log('USER ID: ' + req.user.id)
    const dateStart = moment(date_start).hours(0).minutes(0).seconds(0).millisecond(0)
    const dateEnd = moment(date_end).hours(23).minutes(59).seconds(59).millisecond(999)
    const deletedReservationNumber = await Reservation.destroy({
      where: {
        datetime_start: {
          [Op.gte]: dateStart,
        },
        datetime_end: {
          [Op.lte]: dateEnd,
        },
        specialist_id: req.user.id,
      },
    })
    return res
      .status(200)
      .send(
        'Rezerwacje usunięte pomyślnie. Liczba usuniętych rezerwacji: ' +
          deletedReservationNumber +
          '.',
      )
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Nieobsłużony błąd serwera.' })
  }
}

module.exports = deleteReservationsFromTo
