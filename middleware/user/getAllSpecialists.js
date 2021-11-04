const User = require('../../models/user.model')
const SpecialistJob = require('../../models/specialist_job.model')

const getAllSpecialists = async (req, res) => {
  try {
    let specialists = await SpecialistJob.findAll({
      // where: { role: 'specialist' },
      include: [{ model: User, attributes: ['firstName', 'lastName', 'email', 'phone'] }],
      attributes: ['userId', 'jobName'],
    }).then((res) => res.map((specialist) => specialist.dataValues))
    return res.status(200).send(specialists)
  } catch (err) {
    return res.status(500).send('Internal server error.')
  }
}
module.exports = getAllSpecialists
