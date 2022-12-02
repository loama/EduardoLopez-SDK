import { get } from '../index'
const LOTR = get('bI8jJSvOyGeTzadmKGDF') // key bI8jJSvOyGeTzadmKGDF

LOTR.get('movie')
  .then((res: any) => {
    console.log('a')
    console.log(res.data)
  })
  .catch((e: any) => {
    console.log(e.response.data)
  })
