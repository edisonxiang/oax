import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: (window.location.hostname === 'localhost' && location.port === '8080') ? 'history' : 'hash',
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('../components/pages/ExplorerPage'),
      meta: {name: 'API'}
    },
    {
      path: '/about',
      component: () => import('../components/pages/AboutPage'),
      meta: {name: 'About'}
    },
    {
      path: '/methods',
      component: () => import('../components/pages/MethodPage'),
      meta: {name: 'Methods'}
    },
    {
      path: '/statuses',
      component: () => import('../components/pages/StatusPage'),
      meta: {name: 'Statuses'}
    },
    {
      path: '/headers',
      component: () => import('../components/pages/HeaderPage'),
      meta: {name: 'Headers'}
    },
    {
      path: '/stats',
      component: () => import('../components/pages/StatsPage'),
      meta: {name: 'Statistics'}
    }
  ]
})
