const express = require('express')
const app = express()
require('dotenv').config()

// Modules
const books = require('./book')

app
  .get('/', (req, res) => {
    res.send('Welcome to the LOTR Eduardo SDK')
  })
  .get('/books', (req, res) => books.getAllBooks(req, res))
  .all('*', (req, res) => {
    res.status('404').send('Route not found or incorrect HTTP method, please check and try again')
  })
  .listen(3000, () => {
    console.log('Server started in port 3000')
  })
