import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 3000,
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization: sessionStorage.getItem('auth-token')
  }
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  config.headers.Authorization = sessionStorage.getItem('auth-token')
  return config
})

export { instance }
