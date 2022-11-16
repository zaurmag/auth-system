<template>
  <header class="header">
    <div class="logo">AuthSystem</div>
    <div class="user">
      <div class="user__name">DemoUser</div>
      <app-button classList="btn-primary btn--s30" @click="logout">Logout</app-button>
    </div>
  </header>
</template>

<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push({ name: 'auth', query: { message: 'auth' } })
}
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      font-size: 16px;
    }
  }

  .user {
    display: flex;
    align-items: center;

    &__name {
      margin-right: 15px;
    }
  }
</style>
