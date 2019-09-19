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
  getClients: (_, callback) => {
    Loading.show()
    instance
      .get('/clients')
      .then(res => {
        callback(res.data)
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to fetch the clients`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
      .finally(() => Loading.hide())
  }
}
