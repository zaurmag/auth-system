import axios from 'axios'
import { logout, updateToken } from '../auth-form.ts'

let isRefreshing = false
let failedQueue: { resolve: (token: string | null) => void; reject: (error: unknown) => void }[] =
  []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })

  failedQueue = []
}

axios.interceptors.response.use(null, async (error) => {
  const originalRequest = error.config

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    if (!isRefreshing) {
      isRefreshing = true

      try {
        const token = await updateToken()
        processQueue(null, token)

        return axios(originalRequest)
      } catch (e) {
        processQueue(e, null)
        await logout()

        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }

    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject })
    })
  }

  return Promise.reject(error)
})

export default axios
