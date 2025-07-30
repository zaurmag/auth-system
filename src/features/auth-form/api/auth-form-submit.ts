import axios from 'axios'
import { useAppStore } from '@/shared/store/app-store'
import { deleteCookie, getCookie, setCookie } from '@/shared/lib/cookie'
import type { IAuthFormValue } from '../config/types'
import { JWT_TOKEN } from '@/shared/config/consts'

const store = useAppStore()

export const login = async (payload: IAuthFormValue) => {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FB_KEY}`

    const { data } = await axios.post(url, {
      ...payload,
      returnSecureToken: true,
    })

    setToken(data.idToken)
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw new Error('Unknown error')
    }
  }
}

export const setHeadersToken = (token?: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token || getCookie(JWT_TOKEN)}`
}

const setToken = (token: string) => {
  store.$patch({ token })
  setHeadersToken(token)
  setCookie(JWT_TOKEN, token)
}

export const logout = async () => {
  deleteCookie(JWT_TOKEN)
  delete axios.defaults.headers.common['Authorization']
  store.$patch({ token: '' })
}
