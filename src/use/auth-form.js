import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useAuthForm () {
  const router = useRouter()
  const store = useAuthStore()
  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email',
    yup
      .string()
      .required('Enter email')
      .trim()
      .email('Enter a valid email address')
  )
  const PASS_MINLENGTH = 3
  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .required('Enter the password')
      .trim()
      .min(
        PASS_MINLENGTH,
        `The password must contain at least ${PASS_MINLENGTH} characters`
      )
  )

  const isToManyAttempts = computed(() => submitCount.value >= 5)
  watch(isToManyAttempts, val => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500)
    }
  })

  const onSubmit = handleSubmit(async values => {
    try {
      await store.login(values)
      await router.push({ name: 'home' })
    } catch (e) {
      console.error(e)
    }
  })

  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    isToManyAttempts,
    isSubmitting,
    onSubmit
  }
}
