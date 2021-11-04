const User = require('../../models/user.model')
const Reservation = require('../../models/reservation.model')
const getUserReservations = async (req, res) => {
  try {
    let reservations = await Reservation.findAll({
      where: {
        client_id: req.user.id,
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
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email', 'phone', 'role'] }],
    }).then((res) => res.map((reservation) => reservation.dataValues))
    return res.status(200).send(reservations)
  } catch (err) {
    return res.status(500).send('Internal server error.')
  }
}
module.exports = getUserReservations
