<template>
  <div class="auth">
    <h1 class="auth__title">Авторизация</h1>
    <auth-form />
  </div>
</template>

<script setup>
import AuthForm from '@/components/AuthForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
// import { error } from '@/utils/error'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()
console.log(store)
const isAuth = store.isAuthenticated
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

<style scoped lang="scss">
  .auth {
    margin: 0 auto;
    padding: 40px;
    max-width: 410px;
    background-color: #fff;
    border-radius: 8px;
    flex-shrink: 0;
    width: 100%;
    box-shadow: 0 .25rem .625rem rgba(33, 37, 41, .075);

    &__title {
      margin: 0 0 20px;
      text-align: center;
      font-weight: 500;
      font-size: 24px;
    }
  }
</style>
