import * as yup from 'yup'

import {
   MAX_EMAIL_LEN,
   MAX_PASS_LEN,
   MAX_PHONE_LEN,
   MAX_USERNAME_LEN,
   MIN_EMAIL_LEN,
   MIN_PASS_LEN,
   MIN_PHONE_LEN,
   MIN_USERNAME_LEN
} from '@/constants'

export const formService = () => {
   function vuetifyConfig(state: any) {
      return {
         props: {
            'error-messages': state.errors
         }
      }
   }

   function usernameValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_USERNAME_LEN).max(MAX_USERNAME_LEN)
      return required ? validator.required() : validator
   }

   function passwordValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_PASS_LEN).max(MAX_PASS_LEN).required()
      return required ? validator.required() : validator
   }

   function emailValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_EMAIL_LEN).max(MAX_EMAIL_LEN)
      return required ? validator.required() : validator
   }

   function nameValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_PASS_LEN).max(MAX_PASS_LEN).required()
      return required ? validator.required() : validator
   }

   function imgValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_EMAIL_LEN).max(MAX_EMAIL_LEN)
      return required ? validator.required() : validator
   }

   function phoneValidator(required: boolean = true) {
      const validator = yup.string().min(MIN_PHONE_LEN).max(MAX_PHONE_LEN)
      return required ? validator.required() : validator
   }

   return {
      vuetifyConfig,
      usernameValidator,
      passwordValidator,
      emailValidator,
      nameValidator,
      imgValidator,
      phoneValidator
   }
}
