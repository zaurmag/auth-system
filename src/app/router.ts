import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home-page.vue'
import { useAppStore } from '@/shared/store/app-store'
import { ELayout } from '@/shared/types'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      layout: ELayout.COMMON,
      auth: true,
    },
  },
  {
    path: '/sign-in',
    name: 'auth',
    component: () => import('../pages/auth-page.vue'),
    meta: {
      layout: ELayout.EMPTY,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const store = useAppStore()
  const isAuthenticated = store.isAuthenticated

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
