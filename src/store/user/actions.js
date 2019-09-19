import { Notify, Loading } from 'quasar'
import { instance } from '../../services/axios'
import auth from '../../services/auth'
import router from '../../router'

export default {
  register: (_, { data, callback }) => {
    Loading.show()
    const { name, email, password, company } = data
    const user = {
      name,
      email,
      password,
      company_id: company
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
  getAdmins: (_, callback) => {
    Loading.show()
    instance
      .get('/users')
      .then(res => {
        callback(res.data)
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to fetch the admins`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
      .finally(() => Loading.hide())
  },
  deleteAdmin: (_, { data, callback }) => {
    Loading.show()
    /* eslint-disable camelcase */
    const { user_id } = data
    instance
      .delete('/users/' + user_id)
      .then(res => {
        Notify.create({
          message: 'Admin deletes successfully',
          color: 'positive'
        })
        callback()
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to delete the admin`,
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
        const { auth_token, user } = res.data
        auth.setToken(auth_token)
        sessionStorage.setItem('company_id', user.company_id)
        sessionStorage.setItem('username', user.name)
        return router.push({ name: 'Home' })
      })
      .catch(err => {
        const { error } = err.response.data // bad error handling... check later
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
