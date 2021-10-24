const { DataTypes } = require('sequelize')

const sequelize = require('../data/database.js')
const { reservationStatusEnum } = require('../data/enums.js')
const Reservation = sequelize.define(
  'reservation',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    reservation_status: {
      type: DataTypes.ENUM(reservationStatusEnum),
      allowNull: false,
    },
    reservation_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    datetime_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    datetime_end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
)
module.exports = Reservation
