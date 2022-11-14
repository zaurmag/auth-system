import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/sign-in',
    name: 'auth',
    component: () => import('../views/AuthView.vue'),
    meta: {
      layout: 'empty'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const isAuthenticated = useAuthStore.isAuthenticated

  if (requireAuth) {
    if (isAuthenticated) {
      return next()
    } else {
      next('/sign-in?message=auth')
    }
  }

  next()
})

export default router
