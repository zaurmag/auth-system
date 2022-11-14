<template>
  <div class="card-body p-lg-40">
    <h1 class="h4 text-center mb-25">Авторизация</h1>
    <auth-form />
  </div>
</template>

<script setup>
import AuthForm from '@/components/AuthForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
// import { error } from '@/utils/error'

const route = useRoute()
const router = useRouter()
const isAuth = computed(() => useAuthStore.isAuthenticated)
document.title = 'Система авторизации'

// if (route.query.message && !isAuth.value) {
//   store.dispatch('setMessage', {
//     value: error(route.query.message),
//     type: 'info'
//   })
// }

const redirectIsAuth = val => {
  const auth = val || isAuth.value
  if (auth && route.path === '/sign-in') {
    router.push('/')
  }
}

redirectIsAuth()

watch(isAuth.value, val => {
  redirectIsAuth(val)
})
</script>
