const lotr = require('../index.ts')

const LOTR = lotr.get('bI8jJSvOyGeTzadmKGDF') // key bI8jJSvOyGeTzadmKGDF

LOTR('movie')
  .then((res: any) => {
    console.log(res.data)
  })
  .catch((e: any) => {
    console.log(e.response.data)
  })