import { graphql, buildSchema } from 'graphql'

async function getDataFromEndpoint (API_Instance: any, endpoint: string) {
  const res = await API_Instance.get(endpoint)
  rootValue[endpoint as keyof allData] = res.data.docs
}

type allData = {
  book: Array<Object>,
  character: Array<Object>,
  chapter: Array<Object>,
  quote: Array<Object>,
  movie: Array<Object>
}

const rootValue = {
  book: [
    {
      "_id": "5cf5805fb53e011a64671582",
      "name": "The Fellowship Of The Ring",
      "chapter": []
    }
  ],
  character:  [],
  chapter: [
    {
      "book": ''
    }
  ],
  quote: [],
  movie: [
    {
      "_id": "5cd95395de30eff6ebccde56",
      "name": "The Lord of the Rings Series",
      "runtimeInMinutes": 558,
      "budgetInMillions": 281,
      "boxOfficeRevenueInMillions": 2917,
      "academyAwardNominations": 30,
      "academyAwardWins": 17,
      "rottenTomatoesScore": 94,
      "quote": []
    }
  ]
}

export default async function graphqlHandler (API_Instance: any, query: any) {
  const paths = ['book', 'movie', 'character', 'chapter', 'quote']
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    if (query.includes(path)) {
      await getDataFromEndpoint(API_Instance, path)
    }
  }

  // organize quotes into their movie
  for (let i = 0; i < rootValue.quote.length; i++) {
    const quote = rootValue.quote[i]
    const moviesFiltered = rootValue.movie.filter(movie => movie._id === quote['movie'])[0]
    const movieMatchingIndex = rootValue.movie.indexOf(moviesFiltered)
    const movieMatch = rootValue.movie[movieMatchingIndex]
    
    if (movieMatch['quote'] == undefined) {
      movieMatch['quote'] = []
    }
    movieMatch['quote'].push(quote)
  }

  // organize chapters into their book
  /*
  for (let j = 0; j < rootValue.book.length; j++) {
    const chapter = rootValue.book[j]
    const booksFiltered = rootValue.book.filter(book => book._id === chapter['book'])[0]
    const bookMatchingIndex = rootValue.book.indexOf(booksFiltered)
    const bookMatch = rootValue.book[bookMatchingIndex]
    
    if (bookMatch['chapter'] == undefined) {
      bookMatch['chapter'] = []
    }
    bookMatch['chapter'].push(chapter)
  }
  */
  
  return graphql({
    schema,
    source: query,
    rootValue
  })
}

// Schema
const schema = buildSchema(`
  type Chapter {
    _id: ID!
    chapterName: String!
    book: String!
  }

  type Character {
    _id: ID!
    height: String!
    race: String!
    gender: String
    birth: String!
    spouse: String!
    death: String!
    realm: String!
    hair: String!
    name: String!
    wikiUrl: String
  }

  type Book {
    _id: ID!
    name: String!
    chapter: Chapter
  }

  type Movie {
    _id: ID!
    name: String!
    runtimeInMinutes: Float
    budgetInMillions: Float
    boxOfficeRevenueInMillions: Float
    academyAwardNominations: Float
    academyAwardWins: Float
    rottenTomatoesScore: Float,
    quote: [Quote]
  }

  type Quote {
    _id: ID!
    dialog: String!
    movie: String!
    character: String!
    id: String!
  }

  type Query {
    book: [Book]
    chapter: [Chapter],
    character: [Character]
    movie: [Movie],
    quote: [Quote]
  }
`)
