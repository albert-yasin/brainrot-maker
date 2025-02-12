import axios from 'axios'
import config from '@/configs/configs'

const api_app = axios.create({
  baseURL: config.SERVURL,
  timeout: 60 * 1000, // 60 sec timeout
  maxRedirects: 10, // follow up to 10 HTTP 3xx redirects
  maxContentLength: 50 * 1000 * 1000, // cap the maximum content length we'll accept to 50MBs, just in case
})

const api = axios.create({
  timeout: 60 * 1000, // 60 sec timeout
  maxRedirects: 10, // follow up to 10 HTTP 3xx redirects
  maxContentLength: 50 * 1000 * 1000, // cap the maximum content length we'll accept to 50MBs, just in case
})

export default {
  api_app,
  api,
}
