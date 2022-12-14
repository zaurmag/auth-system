<template>
  <div class="form-row">
    <label v-if="label" :class="['form-label', classListLabel]" :for="id">{{ label }}</label>

    <slot name="prepend" />

    <div v-if="type === 'password'" class="form-control-password">
      <input
        :class="['form-control', { 'is-invalid': error }, classListInput]"
        :id="id"
        :type="password.type"
        :placeholder="placeholder"
        v-model="model"
        @blur="$emit('blur')"
        @input="$emit('input', $event)"
      >

      <app-button
        classList="password-toggle-btn"
        :icon="{ name: password.icon, placement: 'prepend' }"
        @click="togglePassword"
      />
    </div>

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
    <div class="invalid-field" v-if="error">{{ error }}</div>

    <slot name="append" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'

const emit = defineEmits(['blur', 'input'])

const props = defineProps({
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
  classListInput: {
    type: String,
    required: false
  },
  classListLabel: {
    type: String,
    required: false
  }
})

// Password toggle
const passwordToggle = ref(false)
const password = ref({
  type: props.type,
  icon: 'eye'
})

const togglePassword = () => {
  passwordToggle.value = !passwordToggle.value

  if (passwordToggle.value) {
    password.value.type = 'text'
    password.value.icon = 'eye-slash'
  } else {
    password.value.type = 'password'
    password.value.icon = 'eye'
  }
}

const model = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>

<style lang="scss" scoped>
  .form-row {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  .form-label {
    display: block;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 15px;
  }

  .form-control {
    padding: 5px 18px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    height: 47px;
    background-color: #fff;
    transition: border-color 0.3s ease;

    &-password {
      position: relative;

      .form-control {
        padding-right: 60px;
      }
    }

    &.is-invalid {
      border-color: #ff6161;
    }

    &:focus {
      outline: none;
      border-color: #5e74ff;
    }
  }

  .invalid-field {
    margin-top: 5px;
    font-size: 12px;
    color: #ff6161;
  }

  .password-toggle-btn {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
    width: 15px;
    height: 15px;
  }

  @media (max-width: 480px) {
    .form-row {
      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }

    .form-label {
      font-size: 14px;
    }

    .form-control {
      font-size: 15px;
      height: 40px;
    }
  }
</style>
