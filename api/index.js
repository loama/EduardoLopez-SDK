const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', function (req, res) {
  console.log(process.env.API_BASE)
  res.send({ a: 'Hello from express' })
})

app.listen(3000, () => {
  console.log('Server started in port 3000')
})
