<template>
  <form class="form" action="#" @submit.prevent="onSubmit">
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
      classList="btn-primary btn--s47 btn--w100"
      type="submit"
      :animate="{ loading: isSubmitting }"
      :attrs="{ disabled: isToManyAttempts }"
    >Войти</app-button>

    <div v-if="isToManyAttempts" class="form__append-mess">Is too many attempts!</div>
  </form>
</template>

<script>
import FormControl from '@/components/formElements/FormControl.vue';
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthForm } from '@/use/auth-form'

export default {
  name: 'AuthForm',
  setup () {
    return {
      ...useAuthForm()
    }
  },
  components: {
    FormControl,
    AppButton
  }
}
</script>

<style lang="scss" scoped>
  .form {
    &__append-mess {
      margin-top: 15px;
      color: #da4343;
      font-size: 14px;
    }
  }
</style>
