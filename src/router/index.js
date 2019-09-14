import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import auth from '../services/auth'

Vue.use(VueRouter)

const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

Router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    if (auth.getToken()) {
      return next({ name: 'Home' })
    }
    return next()
  }
  if (!auth.getToken()) {
    console.log('oi')
    return next({ name: 'Login' })
  }
  return next()
})

export default Router
