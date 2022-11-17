<template>
  <button
    :class="['btn', {'btn--sending': animate.loading}, classList]"
    :id="id"
    :type="type"
    @click="$emit('click')"
    v-bind="attrs"
  >
    <svg-icon v-if="icon?.placement === 'prepend'" :name="icon?.name" :classList="icon.classList" />
    <slot name="default" />
    <svg-icon v-if="icon?.placement === 'append'" :name="icon?.name" :classList="icon.classList" />
  </button>
</template>

<script setup>
import SvgIcon from '@/components/ui/SvgIcon.vue'

defineEmits(['click'])
defineProps({
  id: {
    type: String,
    required: false
  },
  classList: {
    type: String,
    required: false
  },
  animate: {
    type: Object,
    required: false,
    default () {
      return {}
    }
  },
  type: {
    type: String,
    required: false,
    default: 'button'
  },
  icon: {
    type: Object,
    required: false,
    default () {
      return {}
    }
  },
  attrs: {
    type: Object,
    required: false,
    default () {
      return {}
    }
  },
  attrsWrapper: {
    type: Object,
    required: false,
    default () {
      return {}
    }
  }
})
</script>

<style scoped lang="scss">
  .btn-wrapper {
    display: inline-block;
  }

  .btn-close-icon {
    color: #fff;
    width: 15px;
    height: 15px;
  }

  .icon-eye {
    width: 100%;
    height: 100%;
  }
</style>
