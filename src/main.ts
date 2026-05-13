import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/GridView.vue')
    },
    {
      path: '/project/:id',
      component: () => import('./views/ProjectView.vue')
    },
    {
      path: '/about',
      component: () => import('./views/AboutView.vue')
    },
    {
      path: '/contact',
      component: () => import('./views/ContactView.vue')
    }
  ]
})

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')

