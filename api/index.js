const express = require("express")
const app = express()

app.get('/', function (req, res) {
  res.send({a: 'Hello from express'})
})

app.listen(3000, () => {
  console.log("Server started in port 3000")
})