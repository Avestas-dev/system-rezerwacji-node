const jwt = require('jsonwebtoken')
const getUserByEmail = require('../../utils/getUserByEmail')
// const getUserByEmail = require('../utils/getUserByEmail')

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    req.user = await getUserByEmail(decoded.email)
    return next()
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
}
module.exports = verifyToken
