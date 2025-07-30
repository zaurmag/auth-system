<script setup lang="ts">
import { defineAsyncComponent as DAC } from 'vue'

const AppHeader = DAC(() => import('@/widgets/app-header.vue'))
</script>

<template>
  <aside class="sidebar">Sidebar</aside>

  <div class="content">
    <app-header />

    <main class="content__body">
      <router-view />
    </main>

    <footer class="footer">Footer</footer>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 20px;
  width: 260px;
  background-color: $dark;
  color: $white;
  display: none;

  @media (min-width: 1023px) {
    display: block;
  }
}

.content {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__body {
    padding: 30px;
  }
}

.footer {
  margin-top: auto;
  padding: 20px;
  background-color: $gray-100;
}
</style>
