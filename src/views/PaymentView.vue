<template>
   <payment-layout>
      <v-sheet class='mx-auto pa-2 rounded-lg border-custom'>
         <v-list-item>
            <template v-slot:prepend>
               <v-container class='pa-0'>
                  <v-list-item-title class='text-h6 py-2'>
                     Доставка
                  </v-list-item-title>
                  <v-list-item-subtitle class='text-subtitle-1 pb-2'>
                     Нова пошта
                  </v-list-item-subtitle>
               </v-container>
            </template>
            <template v-slot:append>
               <v-container class='pa-0'>
                  <v-list-item-title class='text-h6 py-2 text-end'>
                     Вартість
                  </v-list-item-title>
                  <v-list-item-subtitle class='text-subtitle-1 pb-2 text-end'>
                     250.00 грн
                  </v-list-item-subtitle>
               </v-container>
            </template>
         </v-list-item>
         <v-form @submit.prevent='submit'>
            <v-row class='ma-0 pb-0'>
               <v-col cols='12' class='pb-2'>
                  <v-text-field
                     v-model='title'
                     v-bind='titleAttrs'
                     label='Номер карти'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='text'
                  ></v-text-field>
               </v-col>

               <v-col cols='6' class='pr-2'>
                  <v-text-field
                     v-model='text'
                     v-bind='textAttrs'
                     label='CVC'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='text'
                  ></v-text-field>
               </v-col>

               <v-col cols='6' class='pl-2'>
                  <v-text-field
                     v-model='text'
                     v-bind='textAttrs'
                     label='MM / YYYY'
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='text'
                  ></v-text-field>
               </v-col>

               <v-col cols='6' class='pr-2'>
                  <v-text-field
                     v-model='text'
                     v-bind='textAttrs'
                     label="Ім'я власника"
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='text'
                  ></v-text-field>
               </v-col>

               <v-col cols='6' class='pl-2'>
                  <v-btn-toggle
                     mandatory
                     v-model="paymentMethod"
                     class='rounded-t-lg bg-grey-lighten-3 h-100'
                  >
                     <v-btn class='border' value="googlePay">
                        <v-icon icon="mdi mdi-google" size='25'></v-icon>
                     </v-btn>

                     <v-btn class='border' value="applePay">
                        <v-icon icon="mdi mdi-apple" size='30'></v-icon>
                     </v-btn>
                  </v-btn-toggle>
               </v-col>

               <v-col cols='12' class='pt-2'>
                  <v-btn
                     :block='true'
                     :disabled='isSubmitting'
                     type='submit'
                     color='primary'
                  >
                     Сплатити
                  </v-btn>
               </v-col>
            </v-row>
         </v-form>
      </v-sheet>
   </payment-layout>
</template>

<script lang='ts' setup>
import PaymentLayout from '@/layouts/PaymentLayout.vue'

import type {MaybeRefOrGetter} from 'vue'
import {ref} from 'vue'
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/yup'
import {storeToRefs} from 'pinia'
import * as yup from 'yup'

import type {AddPostBody} from '@/models'
import {formService, requestService} from '@/services'
import {useHandleError} from '@/composables'
import {useUserStore} from '@/stores'

const {handleError} = useHandleError()
const userStore = useUserStore()
const {currentUser} = storeToRefs(userStore)

// const request = requestService()
const {vuetifyConfig, titleValidator, textValidator} = formService()

const form = useForm({
   validationSchema: toTypedSchema(
      yup.object({
         title: titleValidator(),
         text: textValidator()
      })
   ),
   initialValues: {
      title: '',
      text: ''
   }
})

const isSubmitting = ref<boolean>(false)
const [title, titleAttrs] = form.defineField('title' as MaybeRefOrGetter, vuetifyConfig)
const [text, textAttrs] = form.defineField('text' as MaybeRefOrGetter, vuetifyConfig)

const paymentMethod = ref('googlePay')

const submit = form.handleSubmit(async values => {
   try {
      if (isSubmitting.value) {
         return
      }
      isSubmitting.value = true

      const body: AddPostBody = {
         title: values.title,
         body: values.text,
         userId: currentUser.value.id
      }

      // const post: Post = await request.addPost(body)
      // post.id = lastPostId + 1
      // lastPostId = post.id
      // posts.value.unshift(post)

      form.resetForm()

      isSubmitting.value = false
   } catch (e) {
      console.error(e)
      handleError(e)
      isSubmitting.value = false
   }
})
</script>

<style lang='scss' scoped>
.border-custom {
   border: 2px solid rgba(128, 128, 128, 0.3);
}

.v-btn-toggle {
   display: flex;
   flex-wrap: wrap;
}

.v-btn {
   flex: 1 0 auto;
}
</style>