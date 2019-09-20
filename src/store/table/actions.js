import { Notify, Loading } from 'quasar'
import { instance } from '../../services/axios'

export default {
  register: (_, { data, callback }) => {
    Loading.show()
    const { name, description, company } = data
    const table = {
      name,
      description,
      company_id: company
    }
    instance
      .post('/tables', { table })
      .then(res => {
        Notify.create({
          message: 'Table created successfully',
          color: 'positive'
        })
        callback()
      })
      .finally(() => Loading.hide())
  },
  getTables: (_, callback) => {
    Loading.show()
    instance
      .get('/tables')
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
  deleteTable: (_, { data, callback }) => {
    Loading.show()
    /* eslint-disable camelcase */
    const { table_id } = data
    instance
      .delete('/tables/' + table_id)
      .then(res => {
        Notify.create({
          message: 'Table deleted successfully',
          color: 'positive'
        })
        callback()
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to delete table`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
      .finally(() => Loading.hide())
  }
}
