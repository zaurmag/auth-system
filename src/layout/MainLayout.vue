<template>
  <div class="page">
    <aside class="sidebar">Sidebar</aside>

    <div class="content content--right">
      <app-header />

      <main class="content__body">
        <router-view />
      </main>

      <footer class="footer">Footer</footer>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>
