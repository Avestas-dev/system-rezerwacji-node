const getUserByToken = async (req, res) => {
  try {
    const token = req.headers['Authorization']
    if (req?.user) req.user.dataValues.token = token
    return res.status(200).json(req.user)
  } catch (err) {
    console.log(err)
  }
}
module.exports = getUserByToken
