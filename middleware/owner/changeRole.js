const { Op } = require('sequelize')

// models
const User = require('../../models/user.model')

const changeRole = async (req, res) => {
  try {
    const { role, userId } = req.body
    if (role !== 'client' && role !== 'specialist') {
      return res.status(400).send('Role must be client or specialist.')
    }
    await User.update(
      { role: role },
      {
        where: {
          id: userId,
          [Op.not]: { role: 'owner' },
        },
      },
    )
    return res.status(200).send('User role updated successfully.')
  } catch (err) {
    console.err(err)
    return res.status(500).send(err)
  }
}

module.exports = changeRole
