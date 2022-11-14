<template>
  <span :class="['btn-wrapper', {'progress h-100': Object.keys(animate).length}, classListWrapper]" v-bind="attrsWrapper">
    <button
      :class="['btn', {'progress-bar progress-bar-striped progress-bar-animated': animate.loading}, classListBtn]"
      :id="id"
      :type="type"
      @click="$emit('click')"
      v-bind="attrs"
    >
      <slot name="default" />
    </button>
  </span>
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
    classListBtn: {
      type: String,
      required: false
    },
    classListWrapper: {
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
