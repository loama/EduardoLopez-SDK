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
    name,
    chapter {
      _id,
      chapterName
    }
  }
}`)
  .then((res) => {
    console.log(JSON.stringify(res))
  })
  .catch((e) => {
    console.log(e)
  })
