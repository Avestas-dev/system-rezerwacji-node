const User = require('../models/user.model')
const getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
  })
}

module.exports = getUserByEmail
