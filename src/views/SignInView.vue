<template>
   <auth-layout>
      <v-sheet class='mx-auto pa-6 rounded-lg' width='350'>
         <v-form @submit.prevent='submit'>
            <v-row>
               <v-col cols='12'>
                  <v-text-field
                     v-model='email'
                     v-bind='emailAttrs'
                     label='Email'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='email'
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
                     class='app-color'
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
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/yup'
import * as yup from 'yup'
import type {MaybeRefOrGetter} from 'vue'
import {ref} from 'vue'

import type {CurrentUser, LoginBody} from '@/models'
import {useHandleError, useRouting} from '@/composables'
import {authTokenService, formService, requestService} from '@/services'
import {useUserStore} from '@/stores'
import AuthLayout from '@/layouts/AuthLayout.vue'

const {handleError} = useHandleError()
const routing = useRouting()
const userStore = useUserStore()
const {setCurrentUser} = userStore

const {vuetifyConfig, usernameValidator, passwordValidator} = formService()
const request = requestService()
const authToken = authTokenService()

const form = useForm({
   validationSchema: toTypedSchema(
      yup.object({
         email: usernameValidator(),
         password: passwordValidator()
      })
   ),
   initialValues: {
      email: 'user@test.com',
      password: '111111'
   }
})

const isSubmitting = ref<boolean>(false)
const [email, emailAttrs] = form.defineField('email' as MaybeRefOrGetter, vuetifyConfig)
const [password, passwordAttrs] = form.defineField('password' as MaybeRefOrGetter, vuetifyConfig)

const showPassword = ref<boolean>(false)

const submit = form.handleSubmit(async values => {
   try {
      if (isSubmitting.value) {
         return
      }
      isSubmitting.value = true

      const body: LoginBody = {
         email: values.email,
         password: values.password
      }

      const currentUser: CurrentUser = await request.login(body)
      setCurrentUser(currentUser)
      await authToken.set(currentUser.token)

      await routing.toCatalog()

      isSubmitting.value = false
   } catch (e) {
      console.error(e)
      handleError(e)
      isSubmitting.value = false
   }
})
</script>

<style lang='scss' scoped>
</style>
