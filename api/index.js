import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export default class Lotr {
  constructor (key) {
    let axiosHeaders = {}
    if (key) {
      axiosHeaders = {
        Authorization: 'Bearer ' + key
      }
    }

    this.get = axios.create({
      baseURL: process.env.API_BASE,
      headers: axiosHeaders
    })
  }
}
