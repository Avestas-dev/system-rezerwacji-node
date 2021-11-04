const Reservation = require('../../models/reservation.model')
const moment = require('moment')
const { Op } = require('sequelize')
// duration is in minutes
//TODO: end hours is earlier than start hours - handle over day visits

const getAddedVisitsPerDay = (timeStart, timeEnd, duration) => {
  let iterator = 0
  const timeStartt = moment(timeStart)
  const timeEndd = moment(timeEnd)
  while (timeEndd > timeStartt) {
    timeStartt.add(duration, 'minutes')
    iterator++
  }
  return iterator
}
const getAddedDifferentDays = (dateStart, dateEnd) => {
  const dateStartt = moment(dateStart)
  const dateEndd = moment(dateEnd)
  let iterator = 0
  while (dateEndd >= dateStartt) {
    dateStartt.add(1, 'days')
    iterator++
  }
  return iterator
}

const createReservationFromTo = async (req, res) => {
  try {
    const { name, date_start, date_end, time_start, time_end, duration } = req.body
    console.log(duration)
    if (!(name && date_start && date_end && time_start && time_end)) {
      return res.status(400).json({ msg: 'Wszystkie pola są wymagane.' })
    }

    const dateStart = moment(date_start).hours(0).minutes(0).seconds(0).milliseconds(0)
    const dateEnd = moment(date_end).hours(0).minutes(0).seconds(0).milliseconds(0)
    console.log(dateStart, dateEnd)
    const timeEndAsDate = new Date(time_end)
    const timeStartAsDate = new Date(time_start)

    const timeEnd = moment().hours(timeEndAsDate.getHours()).minutes(timeEndAsDate.getMinutes())
    const timeStart = moment()
      .hours(timeStartAsDate.getHours())
      .minutes(timeStartAsDate.getMinutes())

    if (new Date() >= date_start) {
      return res.status(400).json({ msg: 'Data startu musi być późniejsza niż obecna.' })
    }
    if (dateEnd < dateStart) {
      return res
        .status(400)
        .json({ msg: 'Data końca wizyt musi być późniejsza od daty początku wizyt.' })
    }
    if (timeStart > timeEnd) {
      return res
        .status(400)
        .json({ msg: 'Czas początku wizyt musi być wcześniejszy od czasu końca.' })
    }
    // const daysAdded = (dateEnd - dateStart) / 1000 / 60 / 60 / 24
    const addedVisitsPerDay = getAddedVisitsPerDay(timeStart, timeEnd, duration)
    const addedDifferentDays = getAddedDifferentDays(dateStart, dateEnd)

    // TODO: implement not adding reservation when any exists in given start to end
    const allReservationsCount = await Reservation.count({
      where: {
        datetime_start: {
          [Op.gte]: dateStart,
        },
        datetime_end: {
          [Op.lte]: moment(dateEnd)
            .hours(timeEnd.hours())
            .minutes(timeEnd.minutes())
            .seconds(timeEnd.seconds),
        },
      },
    })

    if (allReservationsCount > 0) {
      return res
        .status(400)
        .json({ msg: 'Rezerwacje już istnieją w podanym zakresie. Najpierw je usuń.' })
    }

    let count = 0
    while (dateEnd >= dateStart) {
      // TODO: implement day skipping
      // if (dateStart.day() === 6 || dateStart.day() === 7) continue
      let timeStartTemp = timeStart.clone()
      for (let i = 0; i < addedVisitsPerDay; i++) {
        count += 1
        Reservation.create({
          name: name,
          specialist_id: req.user.id,
          reservation_status: 'free',
          datetime_start: new Date(
            new Date(dateStart).setHours(
              timeStartTemp.hours(),
              timeStartTemp.minutes(),
              timeStartTemp.seconds(),
            ),
          ),
          datetime_end: new Date(
            new Date(dateStart).setHours(
              timeStartTemp.hours(),
              timeStartTemp.minutes() + duration,
              timeStartTemp.seconds(),
            ),
          ),
        })
        timeStartTemp.add(duration, 'minutes')
      }
      dateStart.add(1, 'days')
    }

    return res
      .status(200)
      .send('Rezerwacje utworzone pomyślnie. Liczba utworzonych rezerwacji: ' + count)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

module.exports = createReservationFromTo
