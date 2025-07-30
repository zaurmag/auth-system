import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, reactive, watch } from 'vue'
import type { IAuthFormValue } from '../config/types'

export function authFormValidate() {
  const initialValues: IAuthFormValue = reactive({
    email: '',
    password: '',
  })
  const { handleSubmit, isSubmitting, submitCount, resetForm } = useForm({
    initialValues,
  })
  const isToManyAttempts = computed(() => submitCount.value >= 5)

  // E-mail field
  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField<string>(
    'email',
    yup.string().required('Enter email').trim().email('Enter a valid email address'),
  )

  // Password field
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
  )

  const insertInitialValues = () => {
    initialValues.email = 'demo@zaurmag.ru'
    initialValues.password = '321321321'

    resetForm({ values: initialValues })
  }

  watch(isToManyAttempts, (val) => {
    if (!val) return

    setTimeout(() => (submitCount.value = 0), 1500)
  })

  return {
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
  }
}
