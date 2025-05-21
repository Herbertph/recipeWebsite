import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  { path: '/recipe/:id', component: () => import('../pages/RecipePage.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
