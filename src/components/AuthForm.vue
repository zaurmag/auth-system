<template>
  <form action="#" @submit.prevent="onSubmit">
    <form-control
      id="email"
      label="E-mail"
      type="email"
      :error="eError"
      :blur="eBlur"
      v-model="email"
      classListInput="form-control-lg"
      placeholder="email@address.com"
    />

    <form-control
      id="password"
      label="Пароль"
      type="password"
      :error="pError"
      :blur="pBlur"
      v-model="password"
      classListInput="form-control-lg"
      placeholder="Не менее 6-ти знаков"
    />

    <app-button
      classListBtn="btn-primary btn-lg w-100"
      classListWrapper="w-100"
      type="submit"
      :animate="{ loading: isSubmitting }"
    >Войти</app-button>
  </form>
</template>

<script>
import { useLoginForm } from '@/use/login-form'

export default {
  name: 'AuthForm',
  setup () {
    return {
      ...useLoginForm()
    }
  }
}
</script>
