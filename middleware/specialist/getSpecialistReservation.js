const Reservation = require('../../models/reservation.model')
const { Op } = require('sequelize')
const moment = require('moment')
const User = require('../../models/user.model')
// for given week, indicated by offeset, where 0 is current week, and can be only positive
const getSpecialistReservation = async (req, res) => {
  try {
    let offset = req.params.offset
    const currDay = moment().day()
    console.log('test - ' + offset)
    const mondayBefore =
      currDay === 0
        ? moment()
            .add(-6 + 7 * offset, 'days')
            .hours(0)
            .minutes(0)
        : moment()
            .add(-(currDay - 1) + 7 * offset, 'days')
            .hours(0)
            .minutes(0)
    const sundayBefore = mondayBefore.clone().add(7, 'days').hours(0).minutes(0)

    let reservations = await Reservation.findAll({
      where: {
        specialist_id: req.user.id,
        datetime_start: {
          [Op.and]: { [Op.gte]: mondayBefore, [Op.lte]: sundayBefore },
        },
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
      include: [
        {
          model: User,
          on: {
            id: { [Op.col]: 'client_id' },
          },
          attributes: ['firstName', 'lastName', 'email', 'phone'],
        },
      ],
      order: [['datetime_start', 'ASC']],
    }).then((res) => res.map((reservation) => reservation.dataValues))
    res.status(200).send(reservations)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Nieobsłużony błąd serwera.' })
  }
}

module.exports = getSpecialistReservation
