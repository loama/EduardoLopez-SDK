import Lotr from '../api/index.js'
const LOTR = new Lotr('bI8jJSvOyGeTzadmKGDF') // key bI8jJSvOyGeTzadmKGDF

LOTR.get('movie')
  .then((res) => {
    console.log('a')
    console.log(res.data)
  })
  .catch((e) => {
    console.log(e.response.data)
  })
