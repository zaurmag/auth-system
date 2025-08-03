<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, defineAsyncComponent as DAC, type Component } from 'vue'
import { ELayout } from '@/shared/config/types.ts'

// Components
const EmptyLayout = DAC(() => import('@/app/layouts/empty-layout.vue'))
const CommonLayout = DAC(() => import('@/app/layouts/common-layout.vue'))

// Define vars
const component: Record<ELayout, Component> = {
  empty: EmptyLayout,
  common: CommonLayout,
}

// Define refs
const route = useRoute()
const layout = computed(() => route.meta.layout as ELayout)
</script>

<template>
  <div :class="`page page--${layout}-layout`">
    <component :is="component[layout]" v-if="layout" />
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: grid;
  height: 100vh;
  min-width: 320px;
  overflow: auto;

  &--empty-layout {
    justify-items: center;
    background-color: $gray-200;

    > .container {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  &--common-layout {
    grid-template-columns: auto 1fr;
  }

  @media (min-width: 479px) {
    &--empty-layout {
      > .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
      }
    }
  }

  @media (max-width: 480px) {
    > .container {
      padding-top: 50px;
    }
  }
}
</style>
