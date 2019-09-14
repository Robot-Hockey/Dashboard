import { Notify, Loading } from 'quasar'
import { instance } from '../../services/axios'
import auth from '../../services/auth'
import router from '../../router'

export default {
  register: (_, data) => {
    console.log(data)
    instance.post('/users', { data }).then(res => {
      console.log(res)
    })
  },
  login (_, data) {
    Loading.show()
    instance
      .post('/login', { email: data.email, password: data.password })
      .then(res => {
        /* eslint-disable camelcase */
        const { auth_token } = res.data
        auth.setToken(auth_token)

        return router.push({ name: 'Home' })
      })
      .catch(err => {
        const { error } = err.response.data
        Object.entries(error).map(err => {
          err[1].map(e => {
            Notify.create({
              message: `${err[0]}: ${e}`,
              color: 'negative',
              icon: 'report_problem'
            })
          })
        })
      }).finally(() => Loading.hide())
  }
}
