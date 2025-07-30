<script setup lang="ts">
import { ZmButton } from 'zm-ui-vue'
import { useAppStore } from '@/shared/store/app-store'
import { storeToRefs } from 'pinia'

const store = useAppStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div v-if="message" :class="['message', 'message--' + message.type]">
    <div class="message__body">
      {{ message.value }}
    </div>

    <zm-button class="message__close" @click="store.clearMessage">close</zm-button>
  </div>
</template>
