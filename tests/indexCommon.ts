const lotr = require('../index.ts')

const LOTR = lotr.REST('bI8jJSvOyGeTzadmKGDF') // key bI8jJSvOyGeTzadmKGDF

LOTR.get('book')
  .then((res: any) => {
    console.log(res.data)
  })
  .catch((e: any) => {
    console.log(e.response.data)
  })