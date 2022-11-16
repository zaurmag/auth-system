import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '../router'

const authStore = useAuthStore()

const dbtAxios = axios.create({
  baseURL: process.env.VUE_APP_DB_URL
})

dbtAxios.defaults.params = {}

dbtAxios.interceptors.request.use(async config => {
  if (authStore.isAuthenticated) {
    return config
  }

  config.params.auth = authStore.getToken

  return config
})

// Add a response interceptor
dbtAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    authStore.logout()
    router.push('/sign-in?message=auth')
  }

  return Promise.reject(error)
})

export default dbtAxios
