const { DataTypes } = require('sequelize')
const sequelize = require('../data/database.js')

// TODO: implement this
// Used for manually storing permissions for given user

const UserPermission = sequelize.define(
  'user_permission',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)
module.exports = UserPermission
