<template>
   <auth-layout>
      <v-sheet class='mx-auto pa-0 rounded-lg bg-transparent' width='350'>
         <p class="app-name-title text-center">Horodyna</p>
         <v-form @submit.prevent='submit'>
            <v-row>
               <v-col cols='12'  class="pb-1">
                  <p class="input-label">Телефон</p>
                  <v-text-field density="compact"
                     v-model='phone'
                     v-bind='phoneAttrs'
                     placeholder="+380XXXXXXXXX"
                     label=""
                     variant="outlined"
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='text'
                  ></v-text-field>
               </v-col>

               <v-col cols='12'>
                  <p class="input-label">Пароль</p>
                  <v-text-field density="compact"
                     v-model='password'
                     v-bind='passwordAttrs'
                     placeholder="******"
                     label=""
                     variant="outlined"
                     :disabled='isSubmitting'
                     :hide-details='true'
                     :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="showPassword ? 'text' : 'password'"
                     @click:append-inner='showPassword = !showPassword'
                  ></v-text-field>
               </v-col>

               <v-col cols='12' class='pb-0'>
                  <div class="text-center">
                     <v-btn type='submit' class="app-btn">Вхід</v-btn>
                  </div>
               </v-col>
               <v-col
                  cols='12'
                  class='d-flex justify-center pb-0'
                  @click='routing.toRegister'
               >
               <p class="enter-account-text">Створити аккаунт</p>
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

      // phone: '',
      // password: ''
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
.enter-account-text {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   color: var(--color-primary);
}

.v-text-field {
   background-color: white;
   outline: none !important;
   border-radius: 50px;
   padding-top: 5px;
}

.app-name-title {
   font-weight: 400;
   font-size: 32px;
   line-height: 69%;
   text-align: center;
   color: var(--color-primary);
   margin-bottom: 40px;
}

.input-label {
   font-weight: 400;
   font-size: 16px;
   color: var(--color-dark);
   margin-bottom: 2px;
   margin-left: 5px;
}
</style>
