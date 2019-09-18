import { Notify, Loading } from 'quasar'
import { instance } from '../../services/axios'

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
      .post('/clients', { user })
      .then(res => {
        Notify.create({
          message: 'Admin created successfully',
          color: 'positive'
        })
        callback()
      })
      .finally(() => Loading.hide())
  },
  getClients: (_, cb) => {
    Loading.show()
    instance.get('/clients').then(res => {
      const { data } = res
      cb(data)
    })
      .catch((err) => console.log(err))
      .finally(() => Loading.hide())
  }
}
