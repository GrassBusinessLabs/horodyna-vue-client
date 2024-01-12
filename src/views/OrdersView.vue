<template>
   <orders-layout>
      <v-list
         v-if="submittedOrders?.length"
         density="compact"
         class="py-0 bg-transparent"
      >
         <app-order
            v-for="order in submittedOrders"
            :order='order'
            :key="order.id"
            @order-details='showOrderDetails(order)'
         ></app-order>
      </v-list>
      <v-sheet v-else class='mx-auto pa-6 rounded-lg'>
         <v-list-item-title
            class='no-item-title text-center py-1'
         >
            Немає жодного замовлення
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
            <v-card-title class='pa-5 py-4 my-border my-order-title'>
               Деталі замовлення #{{ selectedOrder.id }}
               <v-list-item-subtitle class='my-subtitle pt-2 pb-1 d-flex'>
                  Продукти: {{ selectedOrder.product_price }} грн
               </v-list-item-subtitle>
               <v-list-item-subtitle class='my-subtitle py-2'>
                  Доставка: {{ selectedOrder.shipping_price }} грн
               </v-list-item-subtitle>
               Сума: {{ selectedOrder.total_price }} грн
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
   </orders-layout>
</template>

<script lang='ts' setup>
import AppProduct from '@/components/AppProduct.vue'
import AppOrder from '@/components/AppOrder.vue'
import OrdersLayout from '@/layouts/OrdersLayout.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { Offer, Order, OrderById } from '@/models'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { useRouting } from '@/composables'
import { requestService } from '@/services'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const {setCart} = cartStore

setCart()

const farmStore = useFarmStore()
const {populateFarms} = farmStore

populateFarms()

const orderStore = useOrderStore()
const {populateOrders, getSubmittedOrders} = orderStore

populateOrders()

const submittedOrders = getSubmittedOrders()

const offerStore = useOfferStore()
const {populateOffers} = offerStore
const {offers} = storeToRefs(offerStore)

populateOffers()

const sheet = ref(false)

const selectedOrder = ref<Partial<OrderById>>({})

const offersDetails = ref<Offer[]>([])

const showOrderDetails = async (order: Order) => {
   const orderResponse = await request.getOrderById(order.id)
   selectedOrder.value = orderResponse
   console.log(orderResponse);
   console.log(selectedOrder.value);
   
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
.my-order-title {
   font-size: 24px;
}

.no-item-title {
   font-size: 30px;
   white-space: normal;
   line-height: 1;
}

.product-image {
   width: 80px;
   height: 80px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: 15px;
}
</style>