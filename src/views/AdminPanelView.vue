<template>
   <admin-panel-layout>
      <v-list
         density="compact"
         class="py-0 bg-transparent"
      >
         <v-list-item-title class="offer-title">
            Товари без категорії <v-icon size="20" icon="mdi-help-circle"></v-icon>
         </v-list-item-title>
         <div class='pa-4 pr-3 rounded-xl product-item app-item-color d-flex justify-space-between align-center'
            v-for="offer in unprocessedOffers"
            :key="offer.id"
         >
            <div class="d-flex justify-space-between align-center">
               <img width="128" :src="linkIMG + '/' + offer.image" alt="Product image" class="product-image">
               <div class="ml-4">
               <v-list-item-title class='my-font-size my-color my-sub-margin'>
                  {{ offer.title }}
               </v-list-item-title>
               <v-list-item-subtitle class='my-subtitle-fs my-margin'>
                  {{ offer.user.name }}
               </v-list-item-subtitle>
               <v-list-item-subtitle class='my-subtitle-fs'>
                  {{ farmAddress(offer.farm_id) }}
                  <v-icon icon="mdi-map-marker" size='15' class='text-black my-margin'></v-icon>
               </v-list-item-subtitle>
               <v-list-item-title class='my-subtitle-fs my-color my-height'>
                  {{ offer.price }} грн за {{ translate(offer?.unit) }}
               </v-list-item-title>
               </div>
            </div>
            <div class="d-flex align-center">
               <v-icon 
                  class="text-grey-darken-1" 
                  icon="mdi-square-edit-outline" 
                  size='39'
                  @click='sheet = !sheet' 
               ></v-icon>
            </div>
         </div>
      </v-list>

      <v-bottom-sheet v-model="sheet">
         <v-card
            height='595'
            class='pa-0 rounded-t-lg app-item-color'
         >
            <v-card-title class='pa-5 my-border my-title text-center'>
               Налаштування: Салямі
            </v-card-title>
            <v-list class='pa-5 h-100 bg-transparent'>
               <template v-if="changeForm">
                  <v-list-item-title class="offer-title">
                  Обрати категорію з існуючих:
                  </v-list-item-title>
                  <v-select
                     v-model="selectedCategory"
                     :items="categories"
                     label="Категорія"
                     :hide-details="true"
                  ></v-select>

                  <v-btn
                     class='text-white mt-4 w-100 app-color'
                     variant='flat'
                  >
                     Встановити
                  </v-btn>
                  <v-col
                     cols='12'
                     class='pt-2 d-flex justify-center w-100'
                     @click="changeForm = false"
                  >
                     Категорія не існує?
                     <v-list-item-title
                        class='pa-0 ml-1 h-auto w-auto text-capitalize text-orange-accent-4'
                     >
                        Створити
                     </v-list-item-title>
                  </v-col>
               </template>
               <v-form @submit.prevent='submit' v-else>
                  <v-list-item-title class="offer-title">
                  Створити нову категорію:
                  </v-list-item-title>
                  <v-text-field
                     v-model='name'
                     v-bind='nameAttrs'
                     label="Назва категорії"
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='text'
                     class="mb-4"
                  ></v-text-field>

                  <v-text-field
                     v-model='img'
                     v-bind='imgAttrs'
                     label="Зображення (URL)"
                     :disabled='isSubmitting'
                     :hide-details='true'
                     type='text'
                  ></v-text-field>

                  <v-btn
                     color='orange'
                     class='text-white mt-4 w-100'
                     variant='flat'
                  >
                     Створити
                  </v-btn>
                  <v-col
                     cols='12'
                     class='pt-2 d-flex justify-center w-100'
                     @click="changeForm = true"
                  >
                     Категорія вже існує?
                     <v-list-item-title
                        class='pa-0 ml-1 h-auto w-auto text-capitalize text-blue-accent-4'
                     >
                        Встановити
                     </v-list-item-title>
                  </v-col>
               </v-form>
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </admin-panel-layout>
</template>

<script lang='ts' setup>
import { useTranslate } from '@/composables'
import AdminPanelLayout from '@/layouts/AdminPanelLayout.vue'
import { useFarmStore, useOfferStore } from '@/stores'
import { linkIMG } from '@/constants'
import { MaybeRefOrGetter, ref } from 'vue'
import { productsData } from '@/constants/products'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import {toTypedSchema} from '@vee-validate/yup'
import { formService } from '@/services'

const {vuetifyConfig, nameValidator, imgValidator} = formService()
// const request = requestService()

const form = useForm({
   validationSchema: toTypedSchema(
      yup.object({
         name: nameValidator(),
         img: imgValidator()
      })
   ),
   initialValues: {
      name: '',
      img: ''
   }
})

const isSubmitting = ref<boolean>(false)
const [name, nameAttrs] = form.defineField('name' as MaybeRefOrGetter, vuetifyConfig)
const [img, imgAttrs] = form.defineField('img' as MaybeRefOrGetter, vuetifyConfig)

const submit = form.handleSubmit(async values => {
   try {
      if (isSubmitting.value) {
         return
      }
      isSubmitting.value = true

      // const body: LoginBody = {
      //    email: values.email ? values.email : 'Email not found',
      //    password: values.password
      // }

      // const currentUser: CurrentUser = await request.login(body)
      // setCurrentUser(currentUser)
      // await authToken.set(currentUser.token)

      // await routing.toCatalog()

      // isSubmitting.value = false
   } catch (e) {
      // console.error(e)
      // handleError(e)
      // isSubmitting.value = false
   }
})

const { translate } = useTranslate()

const offerStore = useOfferStore()
const {populateOffers, getUnprocessedOffers} = offerStore

populateOffers()

const farmStore = useFarmStore()
const {getFarmAddress} = farmStore

const sheet = ref(false)

const changeForm = ref(false)

const unprocessedOffers = getUnprocessedOffers()

const farmAddress = (farmId: number) => {
   const foundAddress = getFarmAddress(farmId)
   const spliteedAddress = foundAddress ? foundAddress.split(",") : 'Farm not found'
   return spliteedAddress[0] + "," + spliteedAddress[1]
}

const selectedCategory = ref(null)

const categories = productsData.map(product => product.name).sort((a, b) => a.localeCompare(b))
</script>

<style lang='scss' scoped>
.offer-title {
   font-size: 19px;
   margin-bottom: 10px;
}

.product-image {
   width: 80px;
   height: 80px;
   object-fit: cover;
   border-radius: 100%;
}

.my-title {
   font-size: 25px;
}
</style>