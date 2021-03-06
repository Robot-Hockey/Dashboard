const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Home.vue') },
      { path: 'tables', component: () => import('pages/Tables.vue') },
      { path: 'clients', component: () => import('pages/Clients.vue') },
      {
        path: 'clients/:id',
        component: () => import('pages/SingleClient.vue'),
        props: true
      },
      { path: 'operations', component: () => import('pages/Operations.vue') },
      { path: 'matches', component: () => import('pages/Matches.vue') },
      { path: 'rank', component: () => import('pages/Rank.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MyLayout.vue'),
    children: [{ path: '', component: () => import('pages/Admin.vue') }]
  },
  {
    path: '/login',
    name: 'Login',
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
