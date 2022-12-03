import { graphql, buildSchema } from 'graphql'

async function getDataFromEndpoint (API_Instance: any, endpoint: string) {
  const res = await API_Instance.get(endpoint)
  allData[endpoint as keyof allData] = res.data.docs
}

export default async function graphqlHandler (API_Instance: any, query: String) {
  // await getDataFromEndpoint(API_Instance, 'book')
  // await getDataFromEndpoint(API_Instance, 'movie')
  // await getDataFromEndpoint(API_Instance, 'character')

  graphql({
    schema,
    source: `{
      book {
        _id
      },
      movie {
        _id
      },
      character {
        _id
      }
    }`,
    rootValue
  }).then((response) => {
    console.log(JSON.stringify(response))
  })

  // console.log(query)
  // console.log(allData)
}

interface allData {
  book: Array<Object>,
  character: Array<Object>,
  movie: Array<Object>
}

const allData = {
  book: [],
  character: [],
  movie: []
}

// GRAPHQL tutorial
  const rootValue = {
    book: [
      {
        "_id": "5cf5805fb53e011a64671582",
        "name": "The Fellowship Of The Ring"
      },
      {
        "_id": "5cf58077b53e011a64671583",
        "name": "The Two Towers"
      },
      {
        "_id": "5cf58080b53e011a64671584",
        "name": "The Return Of The King"
      }
    ],
    movie: [
      {
        "_id": "5cd95395de30eff6ebccde56",
        "name": "The Lord of the Rings Series",
        "runtimeInMinutes": 558,
        "budgetInMillions": 281,
        "boxOfficeRevenueInMillions": 2917,
        "academyAwardNominations": 30,
        "academyAwardWins": 17,
        "rottenTomatoesScore": 94
      },
      {
          "_id": "5cd95395de30eff6ebccde57",
          "name": "The Hobbit Series",
          "runtimeInMinutes": 462,
          "budgetInMillions": 675,
          "boxOfficeRevenueInMillions": 2932,
          "academyAwardNominations": 7,
          "academyAwardWins": 1,
          "rottenTomatoesScore": 66.33333333
      },
      {
          "_id": "5cd95395de30eff6ebccde58",
          "name": "The Unexpected Journey",
          "runtimeInMinutes": 169,
          "budgetInMillions": 200,
          "boxOfficeRevenueInMillions": 1021,
          "academyAwardNominations": 3,
          "academyAwardWins": 1,
          "rottenTomatoesScore": 64
      },
      {
          "_id": "5cd95395de30eff6ebccde59",
          "name": "The Desolation of Smaug",
          "runtimeInMinutes": 161,
          "budgetInMillions": 217,
          "boxOfficeRevenueInMillions": 958.4,
          "academyAwardNominations": 3,
          "academyAwardWins": 0,
          "rottenTomatoesScore": 75
      },
      {
          "_id": "5cd95395de30eff6ebccde5a",
          "name": "The Battle of the Five Armies",
          "runtimeInMinutes": 144,
          "budgetInMillions": 250,
          "boxOfficeRevenueInMillions": 956,
          "academyAwardNominations": 1,
          "academyAwardWins": 0,
          "rottenTomatoesScore": 60
      },
      {
          "_id": "5cd95395de30eff6ebccde5b",
          "name": "The Two Towers",
          "runtimeInMinutes": 179,
          "budgetInMillions": 94,
          "boxOfficeRevenueInMillions": 926,
          "academyAwardNominations": 6,
          "academyAwardWins": 2,
          "rottenTomatoesScore": 96
      },
      {
          "_id": "5cd95395de30eff6ebccde5c",
          "name": "The Fellowship of the Ring",
          "runtimeInMinutes": 178,
          "budgetInMillions": 93,
          "boxOfficeRevenueInMillions": 871.5,
          "academyAwardNominations": 13,
          "academyAwardWins": 4,
          "rottenTomatoesScore": 91
      },
      {
          "_id": "5cd95395de30eff6ebccde5d",
          "name": "The Return of the King",
          "runtimeInMinutes": 201,
          "budgetInMillions": 94,
          "boxOfficeRevenueInMillions": 1120,
          "academyAwardNominations": 11,
          "academyAwardWins": 11,
          "rottenTomatoesScore": 95
      }
    ],
    character: [
      {
        "_id": "5cd99d4bde30eff6ebccfbbe",
        "height": "",
        "race": "Human",
        "gender": "Female",
        "birth": "",
        "spouse": "Belemir",
        "death": "",
        "realm": "",
        "hair": "",
        "name": "Adanel",
        "wikiUrl": "http://lotr.wikia.com//wiki/Adanel"
      },
      {
          "_id": "5cd99d4bde30eff6ebccfbbf",
          "height": "",
          "race": "Human",
          "gender": "Male",
          "birth": "Before ,TA 1944",
          "spouse": "",
          "death": "Late ,Third Age",
          "realm": "",
          "hair": "",
          "name": "Adrahil I",
          "wikiUrl": "http://lotr.wikia.com//wiki/Adrahil_I"
      },
      {
          "_id": "5cd99d4bde30eff6ebccfbc0",
          "height": "",
          "race": "Human",
          "gender": "Male",
          "birth": "TA 2917",
          "spouse": "Unnamed wife",
          "death": "TA 3010",
          "realm": "",
          "hair": "",
          "name": "Adrahil II",
          "wikiUrl": "http://lotr.wikia.com//wiki/Adrahil_II"
      },
      {
          "_id": "5cd99d4bde30eff6ebccfbc1",
          "height": "",
          "race": "Elf",
          "gender": "Male",
          "birth": "YT during the ,Noontide of Valinor",
          "spouse": "Loved ,Andreth but remained unmarried",
          "death": "FA 455",
          "realm": "",
          "hair": "Golden",
          "name": "Aegnor",
          "wikiUrl": "http://lotr.wikia.com//wiki/Aegnor"
      },
      {
          "_id": "5cd99d4bde30eff6ebccfbc2",
          "height": "",
          "race": "Human",
          "gender": "Female",
          "birth": "Mid ,First Age",
          "spouse": "Brodda",
          "death": "FA 495",
          "realm": "",
          "hair": "",
          "name": "Aerin",
          "wikiUrl": "http://lotr.wikia.com//wiki/Aerin"
      }
    ]
  }

  // Schema
  const schema = buildSchema(`
    type Book {
      _id: ID!
      name: String!
    }

    type Query {
      book: [Book]
      character: [Character]
      movie: [Movie]
    }

    type Movie {
      _id: ID!
      name: String!
      runtimeInMinutes: Float
      budgetInMillions: Float
      boxOfficeRevenueInMillions: Float
      academyAwardNominations: Float
      academyAwardWins: Float
      rottenTomatoesScore: Float
    }

    type Character {
      _id: ID!
      height: String!
      race: String!
      gender: String!
      birth: String!
      spouse: String!
      death: String!
      realm: String!
      hair: String!
      name: String!
      wikiUrl: String!
    }
  `)