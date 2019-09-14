// import { SessionStorage } from 'quasar'

export default {
  getToken: () => sessionStorage.getItem('auth-token'),
  setToken: token => { sessionStorage.setItem('auth-token', token) },
  logout: () => sessionStorage.setItem('auth-token', '')
}
