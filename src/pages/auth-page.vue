<script setup lang="ts">
import { defineAsyncComponent as DAC, onMounted, watch } from 'vue'
import { useAppStore } from '@/shared/model/app-store'
import { useRoute, useRouter } from 'vue-router'
import { authFormValidate } from '@/features/auth-form/model/auth-form-validate'
import { ZmButton, ZmInput } from 'zm-ui-vue'
import { login } from '@/shared/api/auth-form'
import type { IAuthFormValue } from '@/features/auth-form/config/types'
import { decodeMessage, type MessageCodes } from '@/shared/lib/decode-message'
import { EMessageType } from '@/shared/config/types.ts'

// Define components
const AppMessage = DAC(() => import('@/widgets/app-message.vue'))

// Use features
const store = useAppStore()
const {
  email,
  eBlur,
  pBlur,
  eError,
  pError,
  password,
  resetForm,
  submitCount,
  isSubmitting,
  handleSubmit,
  isToManyAttempts,
} = authFormValidate()

const route = useRoute()
const router = useRouter()

// Methods
const init = () => {
  if (route?.query?.message) {
    store.setMessage({
      value: decodeMessage(route.query.message as MessageCodes),
      type: EMessageType.INFO,
    })
  }

  if (!!store.token) {
    router.push({ name: 'home' })
  }
}

const insertInitialValues = () => {
  const values: IAuthFormValue = {
    email: 'demo@zaurmag.ru',
    password: '321321321',
  }

  resetForm({ values })
}

const onSubmit = handleSubmit(async (values: Partial<IAuthFormValue>): Promise<void> => {
  await login(values)
  await router.push({ name: 'home' })
})

// Hooks
onMounted(init)

// Watchers
watch(isToManyAttempts, (val) => {
  if (!val) return

  const TIMEOUT = 3000
  const message = {
    type: EMessageType.WARNING,
    value: decodeMessage('IS_TO_MANY_ATTEMPTS'),
    timeout: TIMEOUT,
  }

  store.setMessage(message)
  setTimeout(() => (submitCount.value = 0), TIMEOUT)
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
          <p>
            Подставить
            <zm-button theme="link" @click.prevent="insertInitialValues"> демо-данные </zm-button>
            для входа
          </p>

          <app-message />
          <!-- <p v-if="isToManyAttempts" class="form__append-mess">Is too many attempts!</p>-->
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
  }
}
</style>
