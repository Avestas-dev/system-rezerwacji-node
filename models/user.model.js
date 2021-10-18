const { DataTypes } = require('sequelize')

const sequelize = require('../data/database.js')
const { rolesEnum } = require('../data/enums.js')
const User = sequelize.define(
  'user',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(rolesEnum),
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)
module.exports = User
