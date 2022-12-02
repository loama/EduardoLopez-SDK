const Lotr = require('../index.ts')

console.log(Lotr)
const LOTR = Lotr('bI8jJSvOyGeTzadmKGDF') // key bI8jJSvOyGeTzadmKGDF

LOTR('movie')
  .then((res: any) => {
    console.log(res.data)
  })
  .catch((e: any) => {
    console.log(e.response.data)
  })