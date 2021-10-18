const { DataTypes } = require('sequelize')
const sequelize = require('../data/database.js')

// assing role to user here
// TODO: implement this
const UserRole = sequelize.define(
  'user_role',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)
module.exports = UserRole
