const { DataTypes } = require('sequelize')
const enums = require('../data/enums.js')
const sequelize = require('../data/database.js')

// TODO: implement this
// Role name is stored here

const SpecialistJob = sequelize.define(
  'user_job',
  {
    jobName: {
      type: DataTypes.ENUM(enums.specialistJobs),
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)
module.exports = SpecialistJob
