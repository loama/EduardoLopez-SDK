import { REST } from '../index'

const LOTR_REST = REST('bI8jJSvOyGeTzadmKGDF') // key bI8jJSvOyGeTzadmKGDF

LOTR_REST.get('book')
  .then((res: any) => {
    console.log(res.data)
  })
  .catch((e: any) => {
    console.log(e.response.data)
  })
