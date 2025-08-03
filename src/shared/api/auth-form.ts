import { AxiosError } from 'axios'
import axios from './axios'
import type { IAuthFormValue } from '@/features/auth-form/config/types'
import { EMessageType } from '../config/types.ts'
import { decodeMessage } from '../lib/decode-message'
import { deleteCookie, getCookie, setCookie } from '../lib/cookie'
import { JWT_REFRESH_TOKEN, JWT_TOKEN } from '../config/consts'
import { useAppStore } from '../model/app-store'

const store = useAppStore()

export const login = async (payload: Partial<IAuthFormValue>) => {
  if (!payload.email && !payload.password) return

  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FB_KEY}`

    const { data } = await axios.post(url, {
      ...payload,
      returnSecureToken: true,
    })

    setToken(data.idToken, data.refreshToken, data.expiresIn)
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      const errorMessage = e.response.data.error.message

      if (errorMessage === 'EMAIL_NOT_FOUND' || errorMessage === 'INVALID_PASSWORD') {
        store.setMessage({ type: EMessageType.DANGER, value: decodeMessage(errorMessage) })
      }

      throw new Error(e.message)
    }

    console.error('Unknown error')
  }
}

export const logout = async () => {
  deleteCookie(JWT_TOKEN)
  deleteCookie(JWT_REFRESH_TOKEN)
  delete axios.defaults.headers.common['Authorization']
  store.$patch({ token: '' })
}

export const updateToken = async () => {
  try {
    const refreshToken = getCookie(JWT_REFRESH_TOKEN)
    const url = `https://securetoken.googleapis.com/v1/token?key=${import.meta.env.VITE_FB_KEY}`

    const { data } = await axios.post(url, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })

    setToken(data.id_token, data.refresh_token, data.expires_in)

    return data.id_token
  } catch (e) {
    await logout()

    if (e instanceof AxiosError && e.response) {
      throw new Error(e.message)
    } else {
      throw new Error('Unknown error')
    }
  }
}

export const setHeadersToken = (token?: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token || getCookie(JWT_TOKEN)}`
}

const setToken = (token: string, refreshToken: string, expiresIn: number) => {
  store.$patch({ token, refreshToken })
  setHeadersToken(token)
  setCookie(JWT_TOKEN, token, expiresIn)
  setCookie(JWT_REFRESH_TOKEN, refreshToken, expiresIn)
}
