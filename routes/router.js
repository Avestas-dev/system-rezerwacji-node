const express = require('express')
const router = express.Router()
// const allrouter = require('./routes')
const common = require('./common')
const user = require('./user')
const owner = require('./owner')
const specialist = require('./specialist')

router.use('/', [common, user, specialist, owner])
module.exports = router
