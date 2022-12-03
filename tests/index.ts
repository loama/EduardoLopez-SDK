import LOTR from '../index'

LOTR.setup('bI8jJSvOyGeTzadmKGDF') // key bI8jJSvOyGeTzadmKGDF

/* LOTR.get('book')
  .then((res: any) => {
    console.log(res)
  })
  .catch((e: any) => {
    console.log(e.response.data)
  }) */

LOTR.graphQL(`{
  book {
    _id,
    name
  },
  chapter {
    _id,
    chapterName,
    book
  },
  character {
    _id,
    height,
    race,
    gender,
    birth,
    spouse,
    death,
    realm,
    hair,
    name,
    wikiUrl
  },
  movie {
    _id,
    name,
    runtimeInMinutes,
    budgetInMillions,
    boxOfficeRevenueInMillions,
    academyAwardNominations,
    academyAwardWins,
    rottenTomatoesScore,
    quote {
      _id,
      dialog,
      movie,
      character,
      id
    }
  }
  quote {
    _id,
    dialog,
    movie,
    character,
    id
  }
}`)
  .then((res) => {
    console.log(res)
  })
  .catch((e) => {
    console.log(e)
  })
