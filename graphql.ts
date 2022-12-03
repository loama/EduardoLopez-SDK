import { graphql, buildSchema } from 'graphql'

async function getDataFromEndpoint (API_Instance: any, endpoint: string) {
  const res = await API_Instance.get(endpoint)
  rootValue[endpoint as keyof rootValue] = res.data.docs
}

interface rootValue {
  book: Array<{_id: string, chapter: Array<Object>}>
  character: Array<Object>
  chapter: Array<Object>
  movie: Array<Object>
  quote: Array<Object>
}

const rootValue = {
  book: [
    {
      "_id": '',
      "chapter": [{
        "book": ''
      }]
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

  if (query.includes('movie')) {
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
  }

  if (query.includes('book')) {
    // organize chapters into their book
    for (let j = 0; j < rootValue.chapter.length; j++) {
      const chapter = JSON.parse(JSON.stringify(rootValue.chapter[j]))
      const booksFiltered = rootValue.book.filter(book => book._id === chapter['book'])[0]
      const bookMatchingIndex = rootValue.book.indexOf(booksFiltered)
      const bookMatch = rootValue.book[bookMatchingIndex]
      
      if (bookMatch['chapter'] == undefined) {
        bookMatch['chapter'] = []
      }

      delete chapter.book
      bookMatch['chapter'].push(chapter)
    }
  }
  
  return graphql({
    schema,
    source: query,
    rootValue
  })
}

// Schema
const schema = buildSchema(`
  type Chapter {
    _id: ID
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
    chapter: [ChapterOfBook]
  }

  type ChapterOfBook {
    _id: ID,
    chapterName: String
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
