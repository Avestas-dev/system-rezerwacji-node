const Reservation = require('../../models/reservation.model')
const getAllReservationBySpecialistId = async (req, res) => {
  try {
    let specialistId = req.params.id
    let reservations = await Reservation.findAll({
      where: {
        specialist_id: specialistId,
      },
      attributes: [
        'id',
        'name',
        'client_id',
        'specialist_id',
        'reservation_status',
        'reservation_timestamp',
        'datetime_start',
        'datetime_end',
      ],
    }).then((res) => res.map((reservation) => reservation.dataValues))
    return res.status(200).send(reservations)
  } catch (err) {
    return res.status(500).send('Internal server error.')
  }
}
module.exports = getAllReservationBySpecialistId
