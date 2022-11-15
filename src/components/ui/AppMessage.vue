<template>
  <div :class="['message', 'message--' + message.type]">
    <div class="message__body">
      Сообщение текст
    </div>
    <app-button classList="message__close">x</app-button>
  </div>
</template>

<script setup>
import { AppButton } from '@/components/ui/AppButton.vue'

const message = {
  type: 'info'
}
</script>

<style scoped lang="scss">
  .message {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
    padding: 15px 20px;
    border-radius: 4px;
    background-color: #3e3e3e;
    color: #fff;
    max-width: 250px;
    width: 100%;

    &__close {
      position: absolute;
      top: 5px;
      right: 10px;
      padding: 0;
    }

    &__body {
      font-size: 14px;
    }

    &--info {
      background-color: #0f78c3;
    }

    &--danger {
      background-color: #fa0000;
    }

    &--success {
      background-color: #00b020;
    }
  }
</style>
