<script setup lang="ts">
import { ZmButton, ZmSvgIcon } from 'zm-ui-vue'
import { useAppStore } from '@/shared/model/app-store'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div v-if="message" :class="['message', 'message--' + message.type]">
    <div class="message__body">
      {{ message.value }}
    </div>

    <zm-button class="message__close-btn" @click="store.clearMessage">
      <zm-svg-icon name="x" />
    </zm-button>
  </div>
</template>

<style scoped lang="scss">
.message {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  padding: 10px 25px 10px 15px;
  border-radius: $border-radius-sm;
  color: #fff;
  max-width: 400px;

  &__close-btn {
    position: absolute;
    top: 5px;
    right: 7px;
    padding: 0;
    font-size: 1rem;
    width: 10px;

    .icon {
      color: $white;
      width: 15px;
    }
  }

  &__body {
    font-size: $font-size-base;
  }

  &--info {
    background-color: $primary;
  }

  &--danger {
    background-color: $danger;
  }

  &--warning {
    background-color: $warning;
  }

  &--success {
    background-color: $success;
  }
}
</style>
