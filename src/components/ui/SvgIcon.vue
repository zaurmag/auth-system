<template>
  <svg :class="['icon', `${prefix}-${name}`, classList]">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
    required: false
  },
  name: {
    type: String,
    required: true
  },
  classList: {
    type: String,
    required: false
  },
  color: {
    type: String,
    default: '',
    required: false
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style lang="scss" scoped>
  :slotted(svg) {
    color: #fff;
    width: 15px;
    height: 15px;
  }
</style>
