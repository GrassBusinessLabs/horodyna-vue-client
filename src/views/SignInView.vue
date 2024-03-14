<template>
   <auth-layout>
      <v-sheet class='mx-auto pa-6 rounded-lg' width='350'>
         <v-form @submit.prevent='submit'>
            <v-row>
               <v-col cols='12'>
                  <v-text-field
                     v-model='phone'
                     v-bind='phoneAttrs'
                     label='Номер телефону'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='text'
                  ></v-text-field>
               </v-col>

               <v-col cols='12'>
                  <v-text-field
                     v-model='password'
                     v-bind='passwordAttrs'
                     label='Пароль'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="showPassword ? 'text' : 'password'"
                     @click:append-inner='showPassword = !showPassword'
                  ></v-text-field>
               </v-col>

               <v-col cols='12' class='pb-0'>
                  <v-btn
                     :block='true'
                     :disabled='isSubmitting'
                     type='submit'
                     class='app-color rounded-lg btn-text'
                     variant='flat'
                  >
                     Вхід
                  </v-btn>
               </v-col>
               <v-col
                  cols='12'
                  class='d-flex justify-center pb-0'
                  @click='routing.toRegister'
               >
                  Немає аккаунту?
                  <v-list-item-title
                     class='pa-0 ml-1 h-auto w-auto text-capitalize text-blue-accent-4'
                  >
                     Реєстрація
                  </v-list-item-title>
               </v-col>
            </v-row>
         </v-form>
      </v-sheet>
   </auth-layout>
</template>

<script lang='ts' setup>
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import type { MaybeRefOrGetter } from 'vue'
import { ref } from 'vue'
import * as yup from 'yup'

import { useHandleError, useRouting } from '@/composables'
import AuthLayout from '@/layouts/AuthLayout.vue'
import type { CurrentUser, LoginBody } from '@/models'
import { authTokenService, formService, requestService } from '@/services'
import { useUserStore } from '@/stores'

const {handleError} = useHandleError()
const routing = useRouting()
const userStore = useUserStore()
const {setCurrentUser} = userStore

const {vuetifyConfig, phoneValidator, passwordValidator} = formService()
const request = requestService()
const authToken = authTokenService()

const form = useForm({
   validationSchema: toTypedSchema(
      yup.object({
         phone: phoneValidator(),
         password: passwordValidator()
      })
   ),
   initialValues: {
      phone: '0951234567',
      password: '222222'
   }
})

const isSubmitting = ref<boolean>(false)
const [password, passwordAttrs] = form.defineField('password' as MaybeRefOrGetter, vuetifyConfig)
const [phone, phoneAttrs] = form.defineField('phone' as MaybeRefOrGetter, vuetifyConfig)

const showPassword = ref<boolean>(false)

const submit = form.handleSubmit(async values => {
   try {
      if (isSubmitting.value) {
         return
      }
      isSubmitting.value = true

      const body: LoginBody = {
         phone_number: values.phone ? values.phone : 'Phone not found',
         password: values.password
      }

      const currentUser: CurrentUser = await request.login(body)
      setCurrentUser(currentUser)
      await authToken.set(currentUser.token)

      await routing.toCatalog()

      isSubmitting.value = false
      form.resetForm()
   } catch (e) {
      console.error(e)
      handleError(e)
      isSubmitting.value = false
   }
})
</script>

<style lang='scss' scoped>
</style>
