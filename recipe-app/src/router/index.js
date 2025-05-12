import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'


const routes = [
  { path: '/', component: HomePage },
  //{ path: '/recipe/:id', component: RecipePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
