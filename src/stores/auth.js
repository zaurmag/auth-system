import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const JWT_TOKEN = 'jwt-token'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem(JWT_TOKEN))

    const login = (values) => {
        console.log(values)
        localStorage.setItem(JWT_TOKEN, 'sdsdsdsd')

        return true
    }

    return {
        token,
        login,
        isAuthenticated: computed(() => !!token.value)
    }
})
