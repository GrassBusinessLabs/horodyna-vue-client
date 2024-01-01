<template>
   <password-change-layout>
      <v-sheet class='mx-auto pa-6 rounded-lg' width='350'>
         <v-form @submit.prevent='submit'>
            <v-row>
               <v-col cols='12'>
                  <v-text-field
                     v-model='oldPassword'
                     v-bind='oldPasswordAttrs'
                     label='Поточний пароль'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     :append-inner-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="showOldPassword ? 'text' : 'password'"
                     @click:append-inner='showOldPassword = !showOldPassword'
                  ></v-text-field>
               </v-col>

               <v-col cols='12'>
                  <v-text-field
                     v-model='newPassword'
                     v-bind='newPasswordAttrs'
                     label='Новий пароль'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="showNewPassword ? 'text' : 'password'"
                     @click:append-inner='showNewPassword = !showNewPassword'
                  ></v-text-field>
               </v-col>

               <v-col cols='7' class='pb-0 pr-1'>
                  <v-btn
                     :block='true'
                     :disabled='isSubmitting'
                     type='submit'
                     class='app-color pb-0'
                     variant='flat'
                  >
                     Змінити
                  </v-btn>
               </v-col>
               <v-col cols='5'>
                  <v-btn
                     :block='true'
                     :disabled='isSubmitting'
                     color='primary'
                     variant='outlined'
                     @click='routing.toSettings'
                     class='pb-0'
                  >
                     Скасувати
                  </v-btn>
               </v-col>
            </v-row>
         </v-form>
      </v-sheet>
   </password-change-layout>
</template>

<script lang='ts' setup>
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/yup'
import * as yup from 'yup'
import type {MaybeRefOrGetter} from 'vue'
import {ref} from 'vue'

import type {PasswordChangeBody} from '@/models'
import {useHandleError, useRouting} from '@/composables'
import {formService, requestService} from '@/services'
import PasswordChangeLayout from '@/layouts/PasswordChangeLayout.vue'

const {handleError} = useHandleError()
const routing = useRouting()

const {vuetifyConfig, passwordValidator} = formService()
const request = requestService()

const form = useForm({
   validationSchema: toTypedSchema(
      yup.object({
         oldPassword: passwordValidator(),
         newPassword: passwordValidator()
      })
   ),
   initialValues: {
      oldPassword: '',
      newPassword: ''
   }
})

const isSubmitting = ref<boolean>(false)
const [oldPassword, oldPasswordAttrs] = form.defineField('oldPassword' as MaybeRefOrGetter, vuetifyConfig)
const [newPassword, newPasswordAttrs] = form.defineField('newPassword' as MaybeRefOrGetter, vuetifyConfig)

const showOldPassword = ref<boolean>(false)
const showNewPassword = ref<boolean>(false)

const submit = form.handleSubmit(async values => {
   try {
      if (isSubmitting.value) {
         return
      }
      isSubmitting.value = true

      const body: PasswordChangeBody = {
         oldPassword: values.oldPassword,
         newPassword: values.newPassword
      }

      await request.changePassword(body)

      await routing.toSettings()

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
