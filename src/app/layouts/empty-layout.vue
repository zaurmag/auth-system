<script setup lang="ts">
import { defineAsyncComponent as DAC } from 'vue'

const AppMessage = DAC(() => import('@/widgets/app-message.vue'))
</script>

<template>
  <router-view />

  <teleport to="body">
    <app-message />
  </teleport>
</template>
