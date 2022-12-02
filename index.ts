import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export default function Lotr(key: String) {
  let axiosHeaders = {}
  if (key) {
    axiosHeaders = {
      Authorization: 'Bearer ' + key
    }
  }

  const instance = axios.create({
    baseURL: 'https://the-one-api.dev/v2/',
    headers: axiosHeaders
  })

  return instance
}

module.exports = Lotr