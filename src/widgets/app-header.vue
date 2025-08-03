<script setup lang="ts">
import { ZmButton } from 'zm-ui-vue'
import { useRouter } from 'vue-router'
import { logout as authFormLogout } from '@/shared/api/auth-form'

const router = useRouter()

const logout = () => {
  authFormLogout()
  router.push({ name: 'auth', query: { message: 'AUTH' } })
}
</script>

<template>
  <header class="header">
    <div class="logo">AuthSystem</div>

    <div class="user">
      <div class="user__name">DemoUser</div>
      <zm-button theme="primary" size="sm" @click="logout">Logout</zm-button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $gray-300;
  padding: 20px;

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
