const { DataTypes } = require('sequelize')
const sequelize = require('../data/database.js')

// TODO: implement this
// Permission name and key, name for displaying to user, key for determining permission

const Permission = sequelize.define(
  'permission',
  {
    permissionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissionKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)
module.exports = Permission
