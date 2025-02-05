import { createRouter, createWebHistory } from 'vue-router'
import configs from '@/configs/configs.js'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
  },
]

const router = createRouter({
  history: createWebHistory(configs.PATHWEBAPP),
  routes,
})

export default router
