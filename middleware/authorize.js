const hasAccess = (reqRole, userRole) => {
  switch (reqRole) {
    case 'client':
      return userRole === 'client' || userRole === 'specialist' || userRole === 'owner'
    case 'specialist':
      return userRole === 'specialist' || userRole === 'owner'
    case 'owner':
      return userRole === 'owner'
    default:
      return false
  }
}

const hasRole = (role) => {
  return async function (req, res, next) {
    try {
      if (hasAccess(role, req.user.role)) {
        next()
      } else {
        res.status(403).send('Forbidden.')
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Internal server error.')
    }
  }
}

module.exports = hasRole
