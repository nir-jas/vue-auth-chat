import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Auth/Register'
import Login from '@/components/Auth/Login'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      component: Home
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
