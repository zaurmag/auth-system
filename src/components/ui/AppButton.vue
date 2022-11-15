<template>
  <button
    :class="['btn', {'btn--sending': animate.loading}, classList]"
    :id="id"
    :type="type"
    @click="$emit('click')"
    v-bind="attrs"
  >
    <slot name="default" />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  emits: ['click'],
  props: {
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
  }
}
</script>

<style scoped lang="sass">
  .btn-wrapper
    display: inline-block
</style>
