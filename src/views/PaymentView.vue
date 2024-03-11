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
      <v-sheet v-else-if="!orderDepartment" class='mx-auto pa-6 pt-4 rounded-lg'>
         <v-list-item-title class='no-item-title text-center pb-4'>
            Введіть своє місто та відділення пошти
         </v-list-item-title>
         <app-address-form @get-addresses="getNewAddresses"></app-address-form>
      </v-sheet>
      <v-sheet v-else class='mx-auto pa-2 pb-3 pt-1 rounded-lg'>
         <v-list-item-title class="order-title my-mt">
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
         selectedOrder?.product_price }} грн</v-card-text>
         <v-list-item-title class="order-title mt-4">
            Ваше місто:
         </v-list-item-title>
         <v-card-text @click="isOpen = true"
            class="text-grey-darken-2 pa-0 px-3 mx-3 mb-3 mt-1 address-title rounded-t-lg">
            {{ orderCity }}
         </v-card-text>
         <v-list-item-title class="order-title mt-4 d-flex align-center">
            <img class="mail-image"
               src='https://play-lh.googleusercontent.com/mtyOm0Rp0PeG_BWE7M5j9gBWuU1Du34LLj-dLdSE1-006_BkFg32W3Cca00l2BBvNM0'>
            Відділення пошти:
         </v-list-item-title>
         <v-card-text @click="isOpen = true"
            class="text-grey-darken-2 pa-0 px-3 mx-3 mb-3 mt-1 address-title rounded-t-lg">{{
         selectedDepartment ? selectedDepartment : orderDepartment }}
         </v-card-text>

         <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
            :initial-breakpoint="0.6">
            <ion-content style="--background: transparent">
               <v-card class="text-center rounded-t-lg" height="600">
                  <v-card-title class='py-5 text-center my-card-title address-search d-flex align-center justify-center'>
                     Зміна відділення <img class="mail-image2"
               src='https://play-lh.googleusercontent.com/mtyOm0Rp0PeG_BWE7M5j9gBWuU1Du34LLj-dLdSE1-006_BkFg32W3Cca00l2BBvNM0'>
                  </v-card-title>
                  <v-autocomplete density="compact" class="ma-5" v-model='addressModel' v-model:search='searchModel'
                     :items='items' :loading='loading' autocomplete='off' item-title='Description'
                     label='Введіть назву міста' prepend-inner-icon='mdi-map-marker' :no-filter='true'
                     :hide-details='true' :return-object='true' @update:modelValue='selectHandler'
                     @update:search='debounceSearch' />
                  <v-sheet class="pr-10">
                     <ion-select justify="start" label="" v-model="temporaryDepartment" aria-label="Відділення"
                        interface="action-sheet" placeholder="Оберіть відділення">
                        <ion-select-option v-for="department in mailDepartments" :key="department.SiteKey"
                           :value="department.Description">{{ department.Description }}</ion-select-option>
                     </ion-select>
                  </v-sheet>
                  <v-card-text class="pa-5 pt-1 mx-2 d-flex justify-center">
                     <v-btn @click="addressModel = null" class='w-50 rounded-lg mr-4' color="indigo" variant='outlined'>
                        Очистити
                     </v-btn>
                     <v-btn @click="changeOrderDepartment" class='app-color w-50 rounded-lg' variant='flat'>
                        Змінити
                     </v-btn>
                  </v-card-text>
               </v-card>
            </ion-content>
         </ion-modal>
         <v-row class='ma-0 pb-0'>
            <v-col cols='6' class="pr-2">
               <v-btn :block='true' color='indigo' variant='outlined' class='pb-0 rounded-lg'
                  @click='routing.toOrders()'>
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
import { UpdateOrder } from '@/models'
import { CityItem, requestService } from '@/services'
import { useCartStore, useOfferStore, useOrderStore, useUserStore } from '@/stores'
import { IonContent, IonModal, IonSelect, IonSelectOption, onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { setCart } = cartStore
const { cart } = storeToRefs(cartStore)

const orderStore = useOrderStore()
const { populateOrders } = orderStore
const { selectedOrder } = storeToRefs(orderStore)

const offerStore = useOfferStore()
const { getOfferById } = offerStore

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const orderDepartment = ref<string | undefined>()
const orderCity = ref<string | undefined>()
const orderCityRef = ref<string | undefined>()

const allMailDepartments = ref()
const mailDepartments = ref()

const mailCities = ref()

const selectedDepartment = ref()
const temporaryDepartment = ref()

const getNovaPoshtaBranches = async (cityRef: string) => {
   const apiKey = 'b486fb3c157ea832c9aa2f2b7c406dec'
   const apiUrl = 'https://api.novaposhta.ua/v2.0/json/'

   const requestBody = {
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
         CityRef: cityRef,
      },
      apiKey: apiKey
   }

   try {
      const response = await axios.post(apiUrl, requestBody)
      if (response.data.success) {
         allMailDepartments.value = response.data.data
         console.log(response.data.data)

         mailDepartments.value = response.data.data.filter((item: any) => item.CategoryOfWarehouse === 'Branch')
      } else {
         console.log('Помилка при отриманні даних:', response.data.errors)
      }
   } catch (error) {
      console.error('Помилка при виконанні запросу:', error)
   }
}

const getNovaPoshtaCities = async () => {
   const apiKey = 'b486fb3c157ea832c9aa2f2b7c406dec'
   const apiUrl = 'https://api.novaposhta.ua/v2.0/json/'

   const requestBody = {
      modelName: 'Address',
      calledMethod: 'getCities',
      apiKey: apiKey
   }

   try {
      const response = await axios.post(apiUrl, requestBody)
      if (response.data.success) {
         mailCities.value = response.data.data
         return response.data.data
      } else {
         console.log('Помилка при отриманні даних:', response.data.errors)
      }
   } catch (error) {
      console.error('Помилка при виконанні запросу:', error)
   }
}

onIonViewWillEnter(async () => {
   await setCart()
   const departmentResponse = await request.getAddressByUserId(currentUser.value?.id ? currentUser.value.id : -1)
   await getNovaPoshtaBranches(departmentResponse.city_ref)
   await getNovaPoshtaCities()
   orderDepartment.value = departmentResponse.department
   orderCity.value = departmentResponse.name
   orderCityRef.value = departmentResponse.city_ref
})

onIonViewWillLeave(async () => {
   selectedDepartment.value = null
})

const isOpen = ref(false)

const loading = ref<boolean>(false)
const addressModel = ref<CityItem | null>(null)
const searchModel = ref<string>('')
const items = ref<CityItem[]>([])

const debounceSearch = debounce(search, 200)

watch(isOpen, async () => {
   if (isOpen.value) {
      addressModel.value = {
         Description: orderCity.value,
         Ref: orderCityRef.value
      }
      temporaryDepartment.value = orderDepartment.value
   }
})

watch(addressModel, async () => {
   if (addressModel.value?.Ref) {
      getNovaPoshtaBranches(addressModel.value?.Ref)
   }
})

const emit = defineEmits<{
   (e: 'select', address: CityItem): void
}>()

function selectHandler(event: CityItem): void {
   emit('select', event)
}

async function search(value: string | null): Promise<void> {
   const searchValue: string = value?.trim() || ''
   items.value = await mailCities.value.filter((city: any) => city.Description.includes(searchValue) && city.SettlementTypeDescription === 'місто' && !city.Description.includes('('))
}

const modalDismissed = () => {
   isOpen.value = false
}

const changeOrderDepartment = () => {
   if (addressModel.value) {
      getNovaPoshtaBranches(addressModel.value.Description)

      isOpen.value = false
      orderCity.value = addressModel.value.Description
      selectedDepartment.value = temporaryDepartment.value
   }
}

const getNewAddresses = async (department: string, city: string, cityRef: string) => {
   orderDepartment.value = department
   orderCity.value = city
   getNovaPoshtaBranches(cityRef)
}

const createSubmittedOrder = async () => {
   const newOrder = await request.submitSplittedOrder(cart.value?.id ? cart.value.id : -1, selectedOrder.value ? selectedOrder.value?.order_items[0].farm.id : -1)
   const body: UpdateOrder = {
      order_id: newOrder.id,
      post_office: selectedDepartment.value ? selectedDepartment.value : orderDepartment.value,
      post_office_city: orderCity.value ? orderCity.value : '',
      address: 'Order Address'
   }
   await request.updateOrderDepartment(body)
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
   line-height: 1.08;
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
   font-size: 16px;
   margin-bottom: 16px;
   margin-left: 21px;
   --background: rgb(247, 247, 247);
   border-bottom: 1px solid rgb(150, 150, 150);
   --padding-end: 20px;
}

.new-department {
   font-size: 23px;
}

.my-mt {
   margin-top: 13px;
}

.mail-image {
   width: 23px;
   height: 23px;
   border-radius: 5px;
   margin-right: 7px;
   margin-bottom: 2px;
}

.mail-image2 {
   width: 28px;
   height: 28px;
   border-radius: 5px;
   margin-left: 8px;
}
</style>