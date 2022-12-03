import axios from 'axios'
import { isBrowser } from 'browser-or-node'
import cachios from 'cachios'
import { setupCache } from 'axios-cache-adapter'
import graphqlHandler from './graphql'

let API_Instance = axios.create({
  baseURL: 'https://the-one-api.dev/v2/'
})

function updateAxiosInstance (key: String) {
  let axiosHeaders = {}
  if (key) {
    axiosHeaders = {
      Authorization: 'Bearer ' + key
    }
  }

  if (!isBrowser) {
    const axiosInstance = axios.create({
      baseURL: 'https://the-one-api.dev/v2/',
      headers: axiosHeaders
    })

    const cachiosInstance: any = cachios.create(axiosInstance,{
      stdTTL: 60 * 60 // in seconds -- so this persist the data in cache for 1 hour
    })

    API_Instance = cachiosInstance
  } else {
    const cache = setupCache({
      maxAge: 60 * 60 * 1000 // in miliseconds -- so this persist the data in cache for 1 hour
    })

    const axiosInstance = axios.create({
      adapter: cache.adapter,
      baseURL: 'https://the-one-api.dev/v2/',
      headers: axiosHeaders
    })

    API_Instance = axiosInstance
  }
}

interface LOTR {
  setup: Function;
  get: Function;
  graphQL: Function;
}

const LOTR = { 
  setup: function (key: String) {
    return updateAxiosInstance(key)
  },
  get: async function (path: string) {
    const resp = await API_Instance.get(path)
    return resp.data
  },
  graphQL: async function (query: String) {
    return graphqlHandler(API_Instance, query)
  }
}

export default LOTR
module.exports = LOTR