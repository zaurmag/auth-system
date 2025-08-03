import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IMessage } from '@/shared/config/types.ts'
import { getCookie } from '@/shared/lib/cookie'
import { JWT_REFRESH_TOKEN, JWT_TOKEN } from '@/shared/config/consts'

export const useAppStore = defineStore('app-model', () => {
  const message = ref<IMessage | null>(null)
  const token = ref<string>(getCookie(JWT_TOKEN) || '')
  const refreshToken = ref<string>(getCookie(JWT_REFRESH_TOKEN) || '')

  const clearMessage = (): void => {
    message.value = null
  }

  const setMessage = (value: IMessage): void => {
    message.value = value
    setTimeout(clearMessage, value.timeout || 5000)
  }

  return { token, refreshToken, message, setMessage, clearMessage }
})
