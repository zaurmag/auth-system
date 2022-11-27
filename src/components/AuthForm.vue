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
      label="Password"
      type="password"
      :error="pError"
      :blur="pBlur"
      v-model="password"
      classListInput="form-control-lg"
      placeholder="At least 3 characters"
    />

    <app-button
      classList="btn-primary btn--s47 btn--w100"
      type="submit"
      :animate="{ loading: isSubmitting }"
      :attrs="{ disabled: isToManyAttempts }"
    >Sign In</app-button>

    <div class="form__footer">
      <p v-if="isToManyAttempts" class="form__append-mess">Is too many attempts!</p>
      <p>Подставить
        <app-button
          classList="btn--link"
          @click="resetForm(); insertData()"
        >демо-данные</app-button> для входа</p>
    </div>
  </form>
</template>

<script>
import FormControl from '@/components/formElements/FormControl.vue';
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthForm } from '@/use/auth-form'
import { ref } from 'vue'

export default {
  name: 'AuthForm',
  setup () {
    const initial = ref({})

    const insertData = () => {
      initial.value = {
        email: 'demo@zaurmag.ru',
        password: '321321321'
      }
    }

    return {
      insertData,
      ...useAuthForm(initial)
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
      color: #da4343;
    }

    &__footer {
      margin-top: 15px;

      p {
        margin: 0;
        font-size: 13px;

        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
