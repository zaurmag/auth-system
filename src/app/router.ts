import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home-page.vue'
import { useAppStore } from '@/shared/model/app-store'
import { ELayout } from '@/shared/config/types.ts'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    layout: ELayout
    auth?: boolean
    title?: string
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      layout: ELayout.COMMON,
      auth: true,
      title: 'Home page',
    },
  },
  {
    path: '/sign-in',
    name: 'auth',
    component: () => import('../pages/auth-page.vue'),
    meta: {
      layout: ELayout.EMPTY,
      title: 'Auth page',
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
  const isAuthenticated = !!store.token

  document.title = to.meta.title || 'Auth system'

  if (requireAuth) {
    if (isAuthenticated) {
      return next()
    } else {
      next('/sign-in?message=AUTH')
    }
  }

  next()
})

export default router
