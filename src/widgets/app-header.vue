<script setup lang="ts">
import { ZmButton } from 'zm-ui-vue'
// import AppButton from '@/components/ui/AppButton.vue'
// import { useAppStore } from '@/shared/store/app-store'
import { useRouter } from 'vue-router'

// const store = useAppStore()
const router = useRouter()

const logout = () => {
  // store.logout()
  router.push({ name: 'auth', query: { message: 'auth' } })
}
</script>

<template>
  <header class="header">
    <div class="logo">AuthSystem</div>

    <div class="user">
      <div class="user__name">DemoUser</div>
      <zm-button theme="primary" @click="logout">Logout</zm-button>
    </div>
  </header>
</template>

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
