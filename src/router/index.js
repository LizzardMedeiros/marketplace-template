import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Provider from '@/pages/Provider'
import Register from '@/pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/provider',
      name: 'Provider',
      component: Provider
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
