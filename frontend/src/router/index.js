import { createRouter, createWebHistory } from 'vue-router';
import AuthForm from '@/views/AuthForm.vue';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: AuthForm,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
