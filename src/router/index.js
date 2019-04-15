import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Map from '@/components/GardenMap'
import DemoMap from '@/components/DemoMap'

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
    },
    {
      path: '/DemoMap',
      name: 'DemoMap',
      component: DemoMap
    }
  ]
})
