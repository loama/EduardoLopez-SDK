const axios = require('axios')

async function getAllBooks (req, res) {
  const books = await axios.get(process.env.API_BASE + 'book')
  console.log(books.data)
  res.send(books.data)
}

module.exports = { getAllBooks }
