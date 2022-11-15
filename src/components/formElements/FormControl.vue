<template>
  <div class="form-row">
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
        class="btn form-control-toggle"
        type="button"
        ref="togglePass"
      >
        ПП
      <!-- <app-icon name="eye" />-->
      </button>
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
    <div class="invalid-feedback d-block fz-12" v-if="error">{{ error }}</div>

    <slot name="append" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
// import togglePassword from '@/utils/toggle-password'

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
        // togglePassword(togglePass.value)
      }
    })

    return {
      togglePass,
      model
    }
  }
}
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

    &-toggle {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }

    &:focus {
      outline: none;
      border-color: #5e74ff;
    }
  }
</style>
