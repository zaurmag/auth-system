<template>
  <div v-if="message" :class="['message', 'message--' + message.type]">
    <div class="message__body">
      {{ message.value }}
    </div>

    <app-button
      classList="message__close"
      :icon="{ name: 'x', placement: 'prepend', classList: 'btn-close-icon' }"
      @click="store.clearMessage"
    />
  </div>
</template>

<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import { useMessageStore } from '@/stores/message'
import { computed } from 'vue'

const store = useMessageStore()
const message = computed(() => store.message)
</script>

<style scoped lang="scss">
  .message {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
    padding: 15px 30px 15px 20px;
    border-radius: 4px;
    background-color: #3e3e3e;
    color: #fff;
    max-width: 400px;

    &__close {
      position: absolute;
      top: 7px;
      right: 8px;
      padding: 0;

      svg {
        width: 15px;
      }
    }

    &__body {
      font-size: 14px;
    }

    &--info {
      background-color: #0f78c3;
    }

    &--danger {
      background-color: #c33f3f;
    }

    &--warning {
      background-color: #c09a2d;
    }

    &--success {
      background-color: #00b020;
    }
  }
</style>
