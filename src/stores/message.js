import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('message', () => {
    const message = ref(null)

    const clearMessage = () => {
        message.value = null
    }

    const setMessage = value => {
        message.value = value
        setTimeout(clearMessage, 5000)
    }

    return {
        message,
        setMessage,
        clearMessage
    }
})
