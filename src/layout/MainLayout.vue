<template>
  <div class="page">
    <aside class="sidebar">Sidebar</aside>

    <div class="content content--right">
      <header class="header">Header</header>

      <main class="content__body">
        <router-view />
      </main>

      <footer class="footer">Footer</footer>
    </div>
  </div>

<!--  <teleport to="body">-->
<!--    <app-message />-->
<!--  </teleport>-->
</template>

<script setup>
// import AppMessage from '@/components/ui/AppMessage'
// import { ref } from 'vue'
</script>

<style scoped lang="sass">

</style>
