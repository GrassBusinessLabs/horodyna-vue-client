<template>
   <orders-layout>
      <v-list v-if="temporaryOrders" density="compact" class="py-0 bg-transparent">
         <app-farm-order v-for="order in temporaryOrders" :order='order' :key="order.id"
            @order-details='showOrderDetails(order)'></app-farm-order>
      </v-list>
      <v-sheet v-else class='mx-auto pa-6 pt-5 rounded-lg'>
         <v-list-item-title class='no-item-title text-center py-0'>
            Немає жодного замовлення
         </v-list-item-title>
         <v-btn color='orange' class='text-white mt-4 w-100 rounded-lg' @click='routing.toCatalog()' variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet>

      <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
         :initial-breakpoint="0.7">
         <ion-content style="--background: transparent">
            <v-card height='700' class='pa-0 rounded-t-lg app-item-color'>
               <v-card-title class='py-4 text-center my-border my-title'>
                  Деталі замовлення #{{ selectedOrder.id }}
                  <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                     Вартість: {{ selectedOrder.total_price }} грн
                  </v-list-item-subtitle>
               </v-card-title>
               <v-list class='pa-5 h-100 bg-transparent'>
                  <app-product v-for="offer in offersDetails" :key="offer.id" :offer='offer' :order-info="{
                     hideIcons: false,
                     order: selectedOrder
                  }" class='app-bg-color-form' />
                  <v-btn block color='orange' class='text-white mt-5 rounded-lg' @click='goToPayment' variant='flat'>
                     Перейти до оплати
                  </v-btn>
               </v-list>
            </v-card>
         </ion-content>
      </ion-modal>

   </orders-layout>
</template>

<script lang='ts' setup>
import AppFarmOrder from '@/components/AppFarmOrder.vue'
import AppProduct from '@/components/AppProduct.vue'
import { useRouting } from '@/composables'
import OrdersLayout from '@/layouts/OrdersLayout.vue'
import { Offer, Order, OrderById } from '@/models'
import { requestService } from '@/services'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { IonContent, IonModal } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { setCart } = cartStore

setCart()

const farmStore = useFarmStore()
const { populateFarms } = farmStore

populateFarms()

const orderStore = useOrderStore()
const { populateOrders, setSelectedOrder } = orderStore

populateOrders()

const temporaryOrders = [
    {
        "id": 39,
        "order_items_count": 1,
        "status": "SUBMITTED",
        "comment": "",
        "address": "Вулиця Станиця Котляревська, 15, Джулинська сільська громада",
        "user_id": 1,
        "product_price": 40,
        "shipping_price": 0,
        "total_price": 40,
        "created_data": "2024-02-28T15:59:04Z"
    },
    {
        "id": 40,
        "order_items_count": 1,
        "status": "SUBMITTED",
        "comment": "",
        "address": "Вулиця Рєпіна, 59, Єнакієвська міська громада",
        "user_id": 1,
        "product_price": 180,
        "shipping_price": 0,
        "total_price": 180,
        "created_data": "2024-02-28T15:59:04Z"
    }
]

const isOpen = ref(false)

const modalDismissed = () => {
   isOpen.value = false
}

const offerStore = useOfferStore()
const { populateOffers } = offerStore
const { offers } = storeToRefs(offerStore)

populateOffers()

const selectedOrder = ref<Partial<OrderById>>({})

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
   isOpen.value = true
}

const goToPayment = () => {
   isOpen.value = false
   setSelectedOrder(selectedOrder.value)
   routing.toPayment()
}
</script>

<style lang='scss' scoped>
.no-item-title {
   font-size: 34px;
   white-space: normal;
   line-height: 1;
}

.order-title {
   font-size: 19px;
   margin-bottom: 10px;
}

.gotten-order {
   opacity: 70%;
}

.order-sum {
   padding-bottom: 2px !important;
}

.my-title {
   font-size: 25px;
}
</style>