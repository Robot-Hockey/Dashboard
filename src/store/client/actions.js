import { Notify, Loading } from 'quasar'
import { instance } from '../../services/axios'

export default {
  register: (_, { data, callback }) => {
    Loading.show()
    const { name, email, company } = data
    const client = {
      name,
      email,
      company_id: company
    }
    instance
      .post('/clients', { client })
      .then(res => {
        Notify.create({
          message: 'Client created successfully',
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
