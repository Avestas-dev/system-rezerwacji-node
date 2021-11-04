// models
const User = require('../../models/user.model')
const Reservation = require('../../models/reservation.model')
const SpecialistJob = require('../../models/specialist_job.model')
const { Op } = require('sequelize')
const deleteSpecialist = async (req, res) => {
  try {
    const { userId } = req.params
    User.destroy({
      where: {
        id: userId,
      },
    })
    Reservation.destroy({
      where: {
        [Op.or]: [{ specialist_id: userId }, { specialist_id: null }],
      },
    })
    SpecialistJob.destroy({
      where: {
        [Op.or]: [{ userId: userId }, { userId: null }],
      },
    })
    res.status(200).send('OK')
  } catch (err) {
    console.log(err)
  }
}

module.exports = deleteSpecialist
