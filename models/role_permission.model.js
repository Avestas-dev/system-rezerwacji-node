const { DataTypes } = require('sequelize')
const sequelize = require('../data/database.js')

// Assing permission to role here

// TODO: implement this
const RolePermission = sequelize.define(
  'role_permission',
  {
    role_id: {
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
module.exports = RolePermission
