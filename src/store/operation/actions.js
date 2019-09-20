import { Notify, Loading } from 'quasar'
import { instance } from '../../services/axios'

export default {
  getOperations: (_, callback) => {
    Loading.show()
    instance
      .get('/operations')
      .then(res => {
        callback(res.data)
      })
      .catch(() => {
        Notify.create({
          message: `Error while trying to fetch the operations`,
          color: 'negative',
          icon: 'report_problem'
        })
      })
      .finally(() => Loading.hide())
  }
}
