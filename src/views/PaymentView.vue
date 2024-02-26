<template>
   <payment-layout>
      <v-sheet v-if='!!cart?.order_items.length' class='mx-auto pa-6 rounded-lg'>
         <v-list-item-title class='no-item-title text-center py-1'>
            Ваш кошик пустий
         </v-list-item-title>
         <v-btn color='orange' class='text-white mt-5 w-100' @click='routing.toCatalog()' variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet>
      <v-sheet v-else-if="!!orderAddress" class='mx-auto pa-6 pt-4 rounded-lg'>
         <v-list-item-title class='no-item-title text-center pb-4'>
            Ви ще не ввели свою адресу
         </v-list-item-title>
         <app-address-form @get-addresses="getNewAddresses"></app-address-form>
      </v-sheet>
      <v-sheet v-else class='mx-auto pa-2 pb-3 pt-1 rounded-lg'>
         <v-list-item-title class="order-title mt-4">
            Замовлення з ферми:
         </v-list-item-title>
         <v-card-text class="text-grey-darken-2 pa-0 px-3 mx-3 mb-3 mt-1 address-title rounded-t-lg">Вулиця Репіна, 59, Градизька селищна громада</v-card-text>
         <v-list-item-title class="order-title mt-4">
            Продукти до сплати:
         </v-list-item-title>
         <v-sheet class="px-3">
            <app-payment-products :is-show-payment-products="true" />
         </v-sheet>

         <v-list-item-title class="order-title mt-4">
            Вартість покупки:
         </v-list-item-title>
         <v-card-text class="text-grey-darken-2 pa-0 px-3 mx-3 mb-3 mt-1 address-title rounded-t-lg">{{ cart?.product_price
         }} грн</v-card-text>

         <v-list-item-title class="order-title mt-4">
            Адреса доставки:
         </v-list-item-title>
         <v-card-text class="text-grey-darken-2 pa-0 px-3 mx-3 mb-3 mt-1 address-title rounded-t-lg">{{ orderAddress }}
            <v-icon size="21" @click="isOpen = true" icon="mdi-pencil"></v-icon></v-card-text>
         <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
            :initial-breakpoint="0.6">
            <ion-content style="--background: transparent">
               <v-card class="text-center rounded-t-lg" height="600">
                  <v-card-title class='py-4 text-center my-card-title'>
                     Пошук адреси
                  </v-card-title>
                  <v-autocomplete class="ma-5" v-model='addressModel' v-model:search='searchModel' :items='items'
                     :loading='loading' autocomplete='off' item-title='address' label='Введіть адресу'
                     prepend-inner-icon='mdi-map-marker-outline' :no-filter='true' :hide-details='true'
                     :return-object='true' @update:modelValue='selectHandler' @update:search='debounceSearch' />
                  <v-card-text class="pa-5 pt-1 mx-2 d-flex justify-center">
                     <v-btn @click="addressModel = null" class='w-50 rounded-lg mr-4' color="indigo" variant='outlined'>
                        Очистити
                     </v-btn>
                     <v-btn @click="changeOrderAddress" class='app-color w-50 rounded-lg' variant='flat'>
                        Зберегти
                     </v-btn>
                  </v-card-text>
               </v-card>
            </ion-content>
         </ion-modal>
         <v-row class='ma-0 pb-0'>
            <v-col cols='6' class="pr-2">
               <v-btn :block='true' color='indigo' variant='outlined' class='pb-0 rounded-lg' @click='routing.toCatalog()'>
                  Скасувати
               </v-btn>
            </v-col>
            <v-col cols='6' class="pl-2">
               <v-btn @click="createSubmittedOrder" :block='true' class='app-color pb-0 rounded-lg' variant='flat'>
                  Замовити
               </v-btn>
            </v-col>
         </v-row>
      </v-sheet>
   </payment-layout>
</template>

<script lang='ts' setup>
import AppAddressForm from '@/components/AppAddressForm.vue'
import AppPaymentProducts from '@/components/AppPaymentProducts.vue'
import { useRouting } from '@/composables'
import PaymentLayout from '@/layouts/PaymentLayout.vue'
import { AddressItem, mapService, requestService } from '@/services'
import { useAddressStore, useCartStore, useOrderStore } from '@/stores'
import { IonContent, IonModal, onIonViewWillEnter } from '@ionic/vue'
import { LngLatLike } from '@tomtom-international/web-sdk-maps'
import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { setCart } = cartStore
const { cart } = storeToRefs(cartStore)

const addressStore = useAddressStore()
const { populateAddresses, getUserAddress } = addressStore

const orderStore = useOrderStore()
const { populateOrders, getDraftOrder } = orderStore

const orderAddress = ref<string | undefined>()

onIonViewWillEnter(async () => {
   await setCart()
   await populateAddresses()
   orderAddress.value = getUserAddress()
})

const map = mapService()

const isOpen = ref(false)

const loading = ref<boolean>(false)
const addressModel = ref<AddressItem | null>(null)
const searchModel = ref<string>('')
const items = ref<AddressItem[]>([])

const debounceSearch = debounce(search, 200)

const emit = defineEmits<{
   (e: 'select', address: AddressItem): void
}>()

function selectHandler(event: AddressItem): void {
   emit('select', event)
}

async function search(value: string | null): Promise<void> {
   try {
      loading.value = true

      const searchValue: string = value?.trim() || ''

      if (!searchValue) {
         items.value = []
         loading.value = false
         return
      }

      items.value = await map.searchAddresses(searchValue)
      if (items.value[0].details.position != undefined) {
         const position: LngLatLike = {
            lat: Number(items.value[0].details.position.lat),
            lng: Number(items.value[0].details.position.lng)
         }
         const ttmap = map.getMap()
         ttmap?.setCenter(position)
      }
      loading.value = false
   } catch (e) {
      console.error(e)
      items.value = []
      loading.value = false
   }
}

const modalDismissed = () => {
   isOpen.value = false
}

const changeOrderAddress = () => {
   orderAddress.value = addressModel.value?.address
   addressModel.value = null
   isOpen.value = false
}

const getNewAddresses = async () => {
   await populateAddresses()
   orderAddress.value = getUserAddress()
}

const createSubmittedOrder = async () => {
   await request.setOrderInSubmitted(55, cart.value?.id ? cart.value.id : -1)
   await populateOrders()
}
</script>

<style lang='scss' scoped>
.v-btn-toggle {
   display: flex;
   flex-wrap: wrap;
}

.v-btn {
   flex: 1 0 auto;
}

.v-btn-toggle {
   min-height: 57px;
}

.no-item-title {
   font-size: 32px;
   white-space: normal;
   line-height: 1;
}

.address-title {
   border-bottom: 2px solid rgb(196, 196, 196);
   background-color: rgb(247, 247, 247);
   padding: 11px 16px !important;
   font-size: 18px;
}

.order-title {
   font-size: 19px;
   margin: 0 13px;
   margin-bottom: 7px;
}
</style>