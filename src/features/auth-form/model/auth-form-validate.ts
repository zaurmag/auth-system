import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'

export function authFormValidate() {
  const { handleSubmit, isSubmitting, submitCount, resetForm } = useForm()
  const isToManyAttempts = computed(() => submitCount.value >= 5)

  // E-mail
  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField<string>(
    'email',
    yup.string().required('Enter email').trim().email('Enter a valid email address'),
    { initialValue: '' },
  )

  // Password
  const PASS_MINLENGTH = 3
  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField<string>(
    'password',
    yup
      .string()
      .required('Enter the password')
      .trim()
      .min(PASS_MINLENGTH, `The password must contain at least ${PASS_MINLENGTH} characters`),
    { initialValue: '' },
  )

  return {
    email,
    eBlur,
    pBlur,
    eError,
    pError,
    password,
    resetForm,
    submitCount,
    handleSubmit,
    isSubmitting,
    isToManyAttempts,
  }
}
