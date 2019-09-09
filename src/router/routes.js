
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'clients', component: () => import('pages/Clients.vue') },
      { path: 'tables', component: () => import('pages/Tables.vue') },
      { path: 'operations', component: () => import('pages/Operations.vue') },
      { path: 'matches', component: () => import('pages/Matches.vue') },
      { path: 'rank', component: () => import('pages/Rank.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
