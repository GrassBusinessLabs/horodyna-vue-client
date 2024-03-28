<template>
   <registration-layout>
      <v-sheet class='mx-auto pa-6 px-0 rounded-lg bg-transparent' width='350'>
         <p class="app-name-title text-center">Horodyna</p>
         <v-form @submit.prevent='submit'>
            <v-row>
               <v-col cols='12' class="pb-1">
                  <p class="input-label">Ім'я</p>
                  <v-text-field density="compact" placeholder="Ваше ім'я" v-model='username' v-bind='usernameAttrs' label=""
                     variant="outlined" :disabled='isSubmitting' :hide-details='true' type='text'></v-text-field>
               </v-col>

               <!-- <v-col cols='12'>
                  <v-text-field
                     v-model='email'
                     v-bind='emailAttrs'
                     label='Email'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='email'
                  ></v-text-field>
               </v-col> -->

               <v-col cols='12' class="pb-1">
                  <p class="input-label">Телефон</p>
                  <v-text-field density="compact" placeholder="+380XXXXXXXXX" v-model='phone' v-bind='phoneAttrs' label=""
                     variant="outlined" :disabled='isSubmitting' :hide-details='true' type='text'></v-text-field>
               </v-col>

               <v-col cols='12' class="pb-1">
                  <p class="input-label">Пароль</p>
                  <v-text-field density="compact" placeholder="******" v-model='password' v-bind='passwordAttrs' label=""
                     variant="outlined" :disabled='isSubmitting' :hide-details='true'
                     :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="showPassword ? 'text' : 'password'"
                     @click:append-inner='showPassword = !showPassword'></v-text-field>
               </v-col>

               <v-col cols='12' class="pb-4">
                  <p class="input-label">Підтвердіть пароль</p>
                  <v-text-field density="compact" placeholder="******" v-model='repeatedPassword' v-bind='repeatedPasswordAttrs' label=""
                     variant="outlined" :disabled='isSubmitting' :hide-details='true'
                     :append-inner-icon="showRepeatedPassword ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="showRepeatedPassword ? 'text' : 'password'"
                     @click:append-inner='showRepeatedPassword = !showRepeatedPassword'></v-text-field>
               </v-col>

               <v-col cols='12' class="pb-0">
                  <div class="text-center">
                     <v-btn type='submit' class="app-btn">Зареєструватися</v-btn>
                  </div>
               </v-col>
               <v-col cols='12' class='pb-0 d-flex justify-center' @click='routing.toSignIn'>
                  <p class="create-account-text">Увійти в аккаунт</p>
               </v-col>
            </v-row>
         </v-form>
      </v-sheet>
   </registration-layout>
</template>

<script lang='ts' setup>
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import type { MaybeRefOrGetter } from 'vue'
import { ref } from 'vue'
import * as yup from 'yup'

import { useHandleError, useRouting } from '@/composables'
import RegistrationLayout from '@/layouts/RegistrationLayout.vue'
import type { CurrentUser, RegisterBody } from '@/models'
import { authTokenService, formService, requestService } from '@/services'
import { useUserStore } from '@/stores'

const { handleError } = useHandleError()
const routing = useRouting()
const userStore = useUserStore()
const { setCurrentUser } = userStore

const { vuetifyConfig, usernameValidator, passwordValidator, phoneValidator } = formService()
const request = requestService()
const authToken = authTokenService()

const form = useForm({
   validationSchema: toTypedSchema(
      yup.object({
         username: usernameValidator(),
         password: passwordValidator(),
         repeatedPassword: passwordValidator(),
         phone: phoneValidator()
      })
   ),
   initialValues: {
      username: '',
      password: '',
      repeatedPassword: '',
      phone: ''
   }
})

const isSubmitting = ref<boolean>(false)
const [username, usernameAttrs] = form.defineField('username' as MaybeRefOrGetter, vuetifyConfig)
const [password, passwordAttrs] = form.defineField('password' as MaybeRefOrGetter, vuetifyConfig)
const [repeatedPassword, repeatedPasswordAttrs] = form.defineField('repeatedPassword' as MaybeRefOrGetter, vuetifyConfig)
const [phone, phoneAttrs] = form.defineField('phone' as MaybeRefOrGetter, vuetifyConfig)

const showPassword = ref<boolean>(false)
const showRepeatedPassword = ref<boolean>(false)

const submit = form.handleSubmit(async values => {
   if (values.password === values.repeatedPassword) {
      try {
         if (isSubmitting.value) {
            return
         }
         isSubmitting.value = true

         const body: RegisterBody = {
            name: values.username ? values.username : 'Name not found',
            email: 'email@test.com',
            password: values.password,
            phone_number: values.phone ? values.phone : 'Phone not found'
         }

         const currentUser: CurrentUser = await request.register(body)
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
   }
})
</script>

<style lang='scss' scoped>
.create-account-text {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   color: var(--color-primary);
}

.input-label {
   font-weight: 400;
   font-size: 16px;
   color: var(--color-dark);
   margin-bottom: 2px;
   margin-left: 5px;
}

.app-name-title {
   font-weight: 400;
   font-size: 32px;
   line-height: 69%;
   text-align: center;
   color: var(--color-primary);
   margin-bottom: 40px;
}

.v-text-field {
   background-color: white;
   outline: none !important;
   border-radius: 50px;
   padding-top: 5px;
}
</style>
