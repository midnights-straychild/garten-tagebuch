import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Map from '@/components/GardenMap'

Vue.use(Router)

export default new Router({
  name: 'Router',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/GardenMap',
      name: 'GardenMap',
      component: Map
    }
  ]
})
