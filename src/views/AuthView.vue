<template>
  <div class="auth">
    <h1 class="auth__title">Authorization</h1>
    <auth-form />
  </div>
</template>

<script setup>
import AuthForm from '@/components/AuthForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import { error } from '@/utils/error'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const messageStore = useMessageStore()
const isAuth = authStore.isAuthenticated

if (route.query.message && !isAuth) {
  messageStore.setMessage({
    value: error(route.query.message),
    type: 'info'
  })
}

const redirectIsAuth = val => {
  const auth = val || isAuth

  if (auth && route.path === '/sign-in') {
    router.push({ name: 'home' })
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

    @media (max-width: 480px) {
      padding: 20px;

      &__title {
        margin-bottom: 15px;
        font-size: 20px;
      }
    }
  }
</style>
