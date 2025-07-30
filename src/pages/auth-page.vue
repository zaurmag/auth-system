<script setup lang="ts">
import { useRouter } from 'vue-router'
import { authFormValidate } from '@/features/auth-form/model/auth-form-validate'
import { ZmInput, ZmButton } from 'zm-ui-vue'
import { login } from '@/features/auth-form/api/auth-form-submit'
import type { IAuthFormValue } from '@/features/auth-form/config/types'

// Use features
const {
  email,
  eBlur,
  pBlur,
  eError,
  pError,
  password,
  isSubmitting,
  handleSubmit,
  isToManyAttempts,
  insertInitialValues,
} = authFormValidate()
const router = useRouter()

// Methods
const onSubmit = handleSubmit(async (values: IAuthFormValue) => {
  try {
    await login(values)
    await router.push({ name: 'home' })
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw new Error('Unknown error')
    }
  }
})
</script>

<template>
  <div class="container">
    <div class="auth">
      <h1 class="auth__title">Authorization</h1>

      <form class="auth__form" action="#" @submit.prevent="onSubmit">
        <zm-input
          v-model="email"
          type="text"
          label="E-mail"
          size="lg"
          :error="eError"
          placeholder="email@address.com"
          @blur="eBlur"
        />

        <zm-input
          v-model="password"
          type="password"
          label="Password"
          size="lg"
          placeholder="At last 3 characters"
          :error="pError"
          @blur="pBlur"
        />

        <zm-button theme="primary" size="lg" :is-animation="isSubmitting">Sign In</zm-button>

        <div class="auth__form-footer">
          <p v-if="isToManyAttempts" class="form__append-mess">Is too many attempts!</p>
          <p>
            Подставить
            <zm-button theme="link" @click.prevent="insertInitialValues"> демо-данные </zm-button>
            для входа
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
}

.auth {
  display: grid;
  grid-gap: 1.5rem;
  padding: 2rem;
  max-width: 410px;
  background-color: $white;
  border-radius: 8px;
  flex-shrink: 0;
  width: 100%;
  box-shadow: 0 0.25rem 0.625rem rgba(33, 37, 41, 0.075);

  &__title {
    text-align: center;
    font-weight: 500;
    font-size: 1.5rem;
  }

  &__form {
    display: grid;
    grid-gap: 1rem;

    &-footer {
      p {
        font-size: 1rem;
        margin: 0;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    grid-gap: 1rem;

    &__title {
      font-size: 1rem;
    }
  }
}
</style>
