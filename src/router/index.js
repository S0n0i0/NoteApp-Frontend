import { createRouter, createWebHistory } from 'vue-router';
import AuthForm from '@/views/AuthForm.vue';
import Home from '@/views/Home.vue';
import GoogleRedirect from '@/views/GoogleRedirect.vue';
import { useUserStore } from '@/stores/userStore';

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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/google-redirect',
    name: 'googleRedirect',
    component: GoogleRedirect,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function isLoggedIn() {
  let token = useUserStore().authToken;
  if (token) {
    return true;
  } else {
    return false;
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next();
    //next({ name: 'login' });
  } else if (to.name == 'login' && isLoggedIn()) {
    next({ name: 'home' });
  } else if (to.name == 'googleRedirect') {
    let token = to.query.token;
    if (token) {
      useUserStore().authToken = token;
      next({ name: 'home' });
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router
