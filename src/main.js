import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'

import './assets/scss/main.scss'

const app = createApp(App)

app
    .use(createPinia())
    .use(router)

app.mount('#app')
