import axios from 'axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMessageStore } from '@/stores/message'
import { error } from '@/utils/error'

const JWT_TOKEN = 'jwt-token'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem(JWT_TOKEN) || null)
    const messageStore = useMessageStore()

    const setToken = idToken => {
        token.value = idToken
        localStorage.setItem(JWT_TOKEN, idToken)
    }

    const login = async payload => {
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYJtXGK5Bk4aAKSgJyrPIIFSeuxOcaQbk'
            const { data } = await axios.post(url, {
                ...payload,
                returnSecureToken: true
            })
            console.log(data)
            localStorage.setItem(JWT_TOKEN, data)
            messageStore.clearMessage()
        } catch (e) {
            messageStore.setMessage({
                value: error(e.response.data.error.message),
                type: 'danger'
            })
            throw new Error()
        }
    }

    const logout = () => {
        token.value = null
        localStorage.removeItem(JWT_TOKEN)
    }

    const getToken = computed(() => token.value)

    return {
        token,
        getToken,
        setToken,
        login,
        logout,
        isAuthenticated: computed(() => !!token.value)
    }
})
