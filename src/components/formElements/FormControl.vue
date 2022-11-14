<template>
  <div :class="classListWrapper">
    <label v-if="label" :class="['form-label', classListLabel]" :for="id">{{ label }}</label>

    <slot name="prepend" />

    <div v-if="type === 'password'" class="form-control-password">
      <input
        :class="['form-control', { 'is-invalid': error }, classListInput]"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="model"
        @blur="$emit('blur')"
        @input="$emit('input', $event)"
      >
      <button
        class="btn btn-empty form-control-toggle p-0"
        type="button"
        ref="togglePass"
      >
      <!-- <app-icon name="eye" />-->
      </button>
    </div>

    <textarea
      v-else-if="type === 'textarea'"
      :class="['form-control', { 'is-invalid': error }, classListInput]"
      :id="id"
      @blur="$emit('blur')"
      @input="$emit('input', $event)"
      v-model="model"
    ></textarea>

    <input
      v-else
      :class="['form-control', { 'is-invalid': error }, classListInput]"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      @blur="$emit('blur')"
      @input="$emit('input', $event)"
    >
    <div class="invalid-feedback d-block fz-12" v-if="error">{{ error }}</div>

    <slot name="append" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import togglePassword from '@/utils/toggle-password'

export default {
  name: 'FormControl',
  emits: ['blur', 'input'],
  props: {
    label: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    modelValue: {
      type: Object
    },
    error: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    classListWrapper: {
      type: String,
      required: false,
      default: 'mb-3'
    },
    classListInput: {
      type: String,
      required: false
    },
    classListLabel: {
      type: String,
      required: false
    }
  },
  setup (props, { emit }) {
    const togglePass = ref(null)
    const model = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      }
    })

    onMounted(() => {
      if (togglePass.value) {
        togglePassword(togglePass.value)
      }
    })

    return {
      togglePass,
      model
    }
  }
}
</script>
