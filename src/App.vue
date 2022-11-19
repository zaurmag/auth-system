<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import EmptyLayout from '@/layout/EmptyLayout.vue'
import MainLayout from '@/layout/MainLayout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)
    return {
      layout
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
}
</script>
