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
  },
  getClient: (_, { callback, id }) => {
    Loading.show()
    return instance
      .get(`/clients/${id}`)
      .then(res => {
        callback(res.data)
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to fetch the client`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
      .finally(() => Loading.hide())
  },
  getClientCard: (_, { callback, id }) => {
    return instance
      .get('/cards')
      .then(res => {
        const card = res.data.find(item => item.client_id === parseInt(id, 10))

        callback(card || { value: 0, public_id: 'Não há cartão registrado' })
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to fetch the client`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
  },
  getClientOperations: (_, { callback, id }) => {
    return instance
      .get('operations')
      .then(res => {
        const mappedOps = res.data.filter(op => op.card_id === id)
        callback(mappedOps)
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to fetch the client operations`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
  },
  deleteClient: (_, { data, callback }) => {
    Loading.show()
    /* eslint-disable camelcase */
    const { client_id } = data
    instance
      .delete('/clients/' + client_id)
      .then(res => {
        console.log('oi')
        Notify.create({
          message: 'Client deleted successfully',
          color: 'positive'
        })
        callback()
      })
      .catch(() => {
        console.log('tchau')
        Notify.create({
          message: `Error while trying to delete client`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
      .finally(() => Loading.hide())
  }
}
