<template>
   <purchase-history-layout>
      <v-list
         v-if="completedOrders?.length"
         density="compact"
         class="py-0 bg-transparent"
      >
         <app-order
            v-for="order in completedOrders"
            :order='order'
            :key="order.id"
            @order-details='showOrderDetails(order)'
         ></app-order>
      </v-list>
      <v-sheet v-else class='mx-auto pa-6 rounded-lg'>
         <v-list-item-title
            class='no-item-title text-center py-1'
         >
            Немає жодної покупки
         </v-list-item-title>
         <v-btn
            color='orange'
            class='text-white mt-5 w-100'
            @click='routing.toCatalog()'
            variant='flat'
         >
            Перейти в каталог
         </v-btn>
      </v-sheet>

      <v-bottom-sheet v-model="sheet">
         <v-card
            height='595'
            class='pa-0 rounded-t-lg'
         >
            <v-card-title class='py-4 text-center my-border my-title'>
               Деталі покупки #{{ selectedOrder.id }}
               <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                  Сума: {{ selectedOrder.total_price }} грн
               </v-list-item-subtitle>
            </v-card-title>
            <v-list class='pa-5 h-100'>
               <app-product
                  v-for="offer in offersDetails"
                  :key="offer.id"
                  :offer='offer'
                  class='app-bg-color-form'
               />
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </purchase-history-layout>
</template>

<script lang='ts' setup>
import AppOrder from '@/components/AppOrder.vue'
import AppProduct from '@/components/AppProduct.vue'
import { useRouting } from '@/composables'
import PurchaseHistoryLayout from '@/layouts/PurchaseHistoryLayout.vue'
import { Offer, Order } from '@/models'
import { requestService } from '@/services'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const {setCart} = cartStore

setCart()

const farmStore = useFarmStore()
const {populateFarms} = farmStore

populateFarms()

const orderStore = useOrderStore()
const {populateOrders, getCompletedOrders} = orderStore

populateOrders()

const completedOrders = getCompletedOrders()

const sheet = ref(false)

const offerStore = useOfferStore()
const {populateOffers} = offerStore
const {offers} = storeToRefs(offerStore)

populateOffers()

const selectedOrder = ref<Partial<Order>>({})

const offersDetails = ref<Offer[]>([])

const showOrderDetails = async (order: Order) => {
   const orderResponse = await request.getOrderById(order.id)
   selectedOrder.value = orderResponse
   const relatedOffers = offers.value?.filter(offer => orderResponse.order_items.some(item => item.offer_id === offer.id))
   offersDetails.value = relatedOffers ? relatedOffers : [{
         id: -1,
         title: '',
         description: '',
         category: '',
         price: -1,
         unit: '',
         stock: -1,
         status: false,
         image: '',
         user: {
            id: -1,
            name: '',
            email: ''
        },
         farm_id: -1
      }]
   sheet.value = true
}
</script>

<style lang='scss' scoped>
.no-item-title {
   font-size: 29px;
}
</style>