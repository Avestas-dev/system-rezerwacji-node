const User = require('../models/user.model')
const getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role'],
  })
}

module.exports = getUserByEmail
