import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import RecipePage from '../pages/RecipePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/recipe/:id', component: RecipePage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
