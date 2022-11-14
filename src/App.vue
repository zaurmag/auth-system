<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script setup>
import EmptyLayout from '@/layout/EmptyLayout.vue'
import MainLayout from '@/layout/MainLayout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = computed(() => route.meta.layout)
</script>

<style scoped>

</style>
