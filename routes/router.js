const express = require('express')
const router = express.Router()
// const allrouter = require('./routes')
const common = require('./common')
const user = require('./user')
const owner = require('./owner')
const specialist = require('./owner')

router.use('/', common, user, owner, specialist)
module.exports = router
