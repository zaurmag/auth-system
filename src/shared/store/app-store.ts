import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IMessage } from '@/shared/types'

export const useAppStore = defineStore('app-store', () => {
  const isAuthenticated = ref(false)
  const message = ref<IMessage | null>(null)

  const clearMessage = (): void => {
    message.value = null
  }

  const setMessage = (value: IMessage): void => {
    message.value = value
    setTimeout(clearMessage, 5000)
  }

  return { message, setMessage, clearMessage, isAuthenticated }
})
