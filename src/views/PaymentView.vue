<template>
   <payment-layout>
      <v-sheet v-if='!cart?.order_items.length' class='mx-auto pa-6 rounded-lg'>
         <v-list-item-title class='no-item-title text-center py-1'>
            Ваш кошик пустий
         </v-list-item-title>
         <v-btn color='orange' class='text-white mt-5 w-100' @click='routing.toCatalog()' variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet>
      <v-sheet v-else-if="!orderAddress" class='mx-auto pa-6 pt-4 rounded-lg'>
         <v-list-item-title class='no-item-title text-center pb-4'>
            Ви ще не ввели свою адресу
         </v-list-item-title>
         <app-address-form @get-addresses="getNewAddresses"></app-address-form>
      </v-sheet>
      <v-sheet v-else class='mx-auto pa-2 pb-3 pt-1 rounded-lg'>
         <v-list-item-title class="order-title mt-4">
            Замовлення з ферми:
         </v-list-item-title>
         <v-card-text class="text-grey-darken-2 pa-0 px-3 mx-3 mb-3 mt-1 address-title rounded-t-lg">{{
            selectedOrder?.order_items[0].farm.address }}</v-card-text>
         <v-list-item-title class="order-title mt-4">
            Продукти до сплати:
         </v-list-item-title>
         <v-sheet class="px-3">
            <v-list max-height="129" class='pa-0 bg-transparent'>
               <app-payment-product v-for="item in selectedOrder?.order_items" :key="item.id"
                  :offer='getOfferById(item.offer_id)' class='app-bg-color-form' />
            </v-list>
         </v-sheet>

         <v-list-item-title class="order-title mt-4">
            Вартість покупки:
         </v-list-item-title>
         <v-card-text class="text-grey-darken-2 pa-0 px-3 mx-3 mb-3 mt-1 address-title rounded-t-lg">{{
            selectedOrder?.product_price
         }} грн</v-card-text>

         <v-list-item-title class="order-title mt-4">
            Відділення пошти:
         </v-list-item-title>
         <v-card-text class="text-grey-darken-2 pa-0 px-3 mx-3 mb-3 mt-1 address-title rounded-t-lg">{{ selectedDepartment
            ? selectedDepartment : (mailDepartments ?
               mailDepartments[0].Description : '') }}
            <v-icon size="21" @click="isOpen = true" icon="mdi-pencil"></v-icon>
         </v-card-text>
         <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
            :initial-breakpoint="0.6">
            <ion-content style="--background: transparent">
               <v-card class="text-center rounded-t-lg" height="600">
                  <v-card-title class='py-4 text-center my-card-title address-search'>
                     {{ isShowDepartmentsList ? 'Зміна відділення пошти' : 'Пошук відділень за адресою' }}
                  </v-card-title>
                  <template v-if="!isShowDepartmentsList">
                     <v-autocomplete class="ma-5" v-model='addressModel' v-model:search='searchModel' :items='items'
                        :loading='loading' autocomplete='off' item-title='address' label='Введіть адресу'
                        prepend-inner-icon='mdi-map-marker-outline' :no-filter='true' :hide-details='true'
                        :return-object='true' @update:modelValue='selectHandler' @update:search='debounceSearch' />
                     <v-card-text class="pa-5 pt-1 mx-2 d-flex justify-center">
                        <v-btn @click="addressModel = null" class='w-50 rounded-lg mr-4' color="indigo" variant='outlined'>
                           Очистити
                        </v-btn>
                        <v-btn @click="changeOrderAddress" class='app-color w-50 rounded-lg' variant='flat'>
                           Знайти
                        </v-btn>
                     </v-card-text>
                  </template>
                  <template v-else>
                     <v-sheet class="pa-5 pt-3">
                        <ion-select v-model="temporaryDepartment" aria-label="Відділення" interface="action-sheet"
                           placeholder="Оберіть відділення">
                           <ion-select-option v-for="department in mailDepartments" :key="department.SiteKey"
                              :value="department.Description">{{ department.Description }}</ion-select-option>
                        </ion-select>
                        <v-card-text class="px-2 pt-1 d-flex justify-center">
                           <v-btn @click="isOpen = false" class='w-50 rounded-lg mr-4' color="indigo" variant='outlined'>
                              Скасувати
                           </v-btn>
                           <v-btn @click="changeSelectedDepartment" class='app-color w-50 rounded-lg' variant='flat'>
                              Зберегти
                           </v-btn>
                        </v-card-text>
                     </v-sheet>
                  </template>
               </v-card>
            </ion-content>
         </ion-modal>
         <v-row class='ma-0 pb-0'>
            <v-col cols='6' class="pr-2">
               <v-btn :block='true' color='indigo' variant='outlined' class='pb-0 rounded-lg' @click='routing.toOrders()'>
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
import AppPaymentProduct from '@/components/AppPaymentProduct.vue'
import { useRouting } from '@/composables'
import PaymentLayout from '@/layouts/PaymentLayout.vue'
import { AddressItem, mapService, requestService } from '@/services'
import { useAddressStore, useCartStore, useOfferStore, useOrderStore } from '@/stores'
import { IonContent, IonModal, IonSelect, IonSelectOption, onIonViewWillEnter } from '@ionic/vue'
import { LngLatLike } from '@tomtom-international/web-sdk-maps'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { setCart } = cartStore
const { cart } = storeToRefs(cartStore)

const addressStore = useAddressStore()
const { populateAddresses, getUserAddress } = addressStore

const orderStore = useOrderStore()
const { populateOrders } = orderStore
const { selectedOrder } = storeToRefs(orderStore)

const offerStore = useOfferStore()
const { getOfferById } = offerStore

const orderAddress = ref<string | undefined>('Вулиця Лідова, 13, Конотопська міська громада')

const allMailDepartments = ref()
const mailDepartments = ref()

const selectedDepartment = ref()
const temporaryDepartment = ref()

const isShowDepartmentsList = ref(false)

const getNovaPoshtaBranches = async () => {
   const apiKey = 'b486fb3c157ea832c9aa2f2b7c406dec'
   const apiUrl = 'https://api.novaposhta.ua/v2.0/json/'

   const requestBody = {
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
         CityName: 'Полтава',
      },
      apiKey: apiKey
   }

   try {
      const response = await axios.post(apiUrl, requestBody)
      if (response.data.success) {
         allMailDepartments.value = response.data.data

         const formattedAddress = orderAddress.value?.replace("Вулиця", "").split(',')[0]
         mailDepartments.value = response.data.data.filter((item: any) => item.Description.includes(formattedAddress))
      } else {
         console.log('Помилка при отриманні даних:', response.data.errors)
      }
   } catch (error) {
      console.error('Помилка при виконанні запросу:', error)
   }
}

onIonViewWillEnter(async () => {
   await setCart()
   await populateAddresses()
   getNovaPoshtaBranches()
   orderAddress.value = 'Вулиця Лідова, 13, Конотопська міська громада'
   // orderAddress.value = getUserAddress()
})

const map = mapService()

const isOpen = ref(false)

watch(isOpen, async () => {
   if (!isOpen.value) {
      isShowDepartmentsList.value = false
   }
})

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
   if (addressModel.value) {
      orderAddress.value = addressModel.value.address
      addressModel.value = null

      const formattedAddress = orderAddress.value?.replace("Вулиця", "").split(',')[0]
      mailDepartments.value = allMailDepartments.value.filter((item: any) => item.Description.includes(formattedAddress))

      isShowDepartmentsList.value = true
   }
}

const changeSelectedDepartment = () => {
   selectedDepartment.value = temporaryDepartment.value
   isOpen.value = false
}

const getNewAddresses = async () => {
   await populateAddresses()
   orderAddress.value = getUserAddress()
}

const createSubmittedOrder = async () => {
   await request.submitSplittedOrder(cart.value?.id ? cart.value.id : -1, selectedOrder.value ? selectedOrder.value?.order_items[0].farm.id : -1)
   await populateOrders()
   routing.toPurchases()
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

.app-bg-color-form:last-child {
   margin-bottom: 0 !important;
}

.address-search {
   white-space: normal;
   line-height: 1;
}

ion-select {
   font-size: 19px;
   margin-bottom: 7px;
}

.new-department {
   font-size: 23px;
}
</style>