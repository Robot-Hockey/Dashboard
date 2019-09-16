import { Notify, Loading } from 'quasar'
import { instance } from '../../services/axios'
import auth from '../../services/auth'
import router from '../../router'

export default {
  register: (_, data, callback) => {
    Loading.show()
    const { name, email, password, company } = data
    const user = {
      name,
      email,
      password,
      company_id: company.id
    }
    instance
      .post('/users', { user })
      .then(res => {
        Notify.create({
          message: 'Admin created successfully',
          color: 'positive'
        })
        callback()
      })
      .finally(() => Loading.hide())
  },
  getCompanies: (_, callback) => {
    Loading.show()
    instance
      .get('/companies')
      .then(res => {
        callback(
          res.data.map(item => ({ ...item, label: item.name, value: item.id }))
        )
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to fetch the companies`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
      .finally(() => Loading.hide())
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
      })
      .finally(() => Loading.hide())
  }
}
