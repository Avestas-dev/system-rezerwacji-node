const User = require('./user.model')
const Reservation = require('./reservation.model.js')

// TODO: uncomment when new way of roles will be made
// const Role = require('./role.model.js')
// const RolePermission = require('./role_permission.model.js')
// const UserPermission = require('./user_permission.model.JS')
// const Permission = require('./permission.model.js')
// const UserRole = require('./user_role.model.JS')

const sequelize = require('../data/database.js')

const checkDBConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

checkDBConnection()

sequelize.sync()
// User.create({
//   firstName: 'Kamil',
//   lastName: 'Poręba',
//   email: 'kamilporeba@hotmail.com',
//   password: 'kamil',
//   phone: 'dasdsa',
//   role: 'specialist',
// })

module.exports = sequelize
