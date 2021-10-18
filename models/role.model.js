const { DataTypes } = require('sequelize')
const enums = require('../data/enums.js')
const sequelize = require('../data/database.js')

// TODO: implement this
// Role name is stored here

const Role = sequelize.define(
  'role',
  {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)
module.exports = Role
