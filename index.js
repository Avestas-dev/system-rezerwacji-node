var express = require('express')
const app = express()
const path = require('path') // see for what it is
const seq = require('./models/db.js')
const router = require('./routes/router.js')
const cors = require('cors')
const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOpts))

app.use(router)
const port = 3001

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
