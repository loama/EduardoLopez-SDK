import axios from 'axios'
import { isBrowser } from 'browser-or-node'
import cachios from 'cachios'

function createCachiosInstance (key: String) {
  let axiosHeaders = {}
  if (key) {
    axiosHeaders = {
      Authorization: 'Bearer ' + key
    }
  }

  const axiosInstance = axios.create({
    baseURL: 'https://the-one-api.dev/v2/',
    headers: axiosHeaders
  })

  if (!isBrowser) {
    const cachiosInstance: any = cachios.create(axiosInstance,{
      stdTTL: 60 * 60 // in seconds -- so this persist the data in cache for 1 hour
    })

    return cachiosInstance
  } else {
    console.log('abc')
    return 'abc'
  }
}

export function REST(key: String) {
  return createCachiosInstance(key)
}

module.exports = { REST }