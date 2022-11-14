import { ref } from 'vue'
import { defineStore } from 'pinia'
const JWT_TOKEN = 'jwt-token'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem(JWT_TOKEN))

    return {
        token,
        isAuthenticated: !!token.value
    }
})
