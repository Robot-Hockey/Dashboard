// import { Notify } from 'quasar'
import instance from '../../api/axios'

export default {
  register: data =>
    instance.get('/users', { data }).then(res => {
      console.log(res)
    })
}
