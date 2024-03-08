<template>
   <purchase-history-layout>
      <v-list v-if="orders?.filter(order => order.status !== 'DRAFT')" density="compact" class="py-0 bg-transparent">
         <v-list-item-title v-if="orders?.filter(order => order.status !== 'COMPLETED' && order.status !== 'DRAFT')" class="order-title">
            Активні <v-icon size="20" icon="mdi-truck"></v-icon>
         </v-list-item-title>
         <app-order v-for="order in orders?.filter(order => order.status !== 'COMPLETED' && order.status !== 'DRAFT')" :order='order' :key="order.id"
            @order-details='showOrderDetails(order)'></app-order>

         <v-list-item-title v-if="orders?.filter(order => order.status === 'COMPLETED')" class="order-title">
            Отримані <v-icon size="20" icon="mdi-check-circle"></v-icon>
         </v-list-item-title>
         <app-order v-for="order in orders?.filter(order => order.status === 'COMPLETED')" :order='order' :key="order.id"
            @order-details='showOrderDetails(order)' class="gotten-order"></app-order>
      </v-list>
      <v-sheet v-else class='mx-auto pa-5 pt-6 rounded-lg'>
         <div class="d-flex">
            <img width='45%' class="cart-image" src='https://cdn-icons-png.flaticon.com/512/5102/5102639.png'>
         </div>
         <v-list-item-title class='no-item-title text-center py-0'>
            Немає жодного замовлення
         </v-list-item-title>
         <v-btn class='text-white mt-4 w-100 rounded-lg app-color' @click='routing.toCatalog()' variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet>

      <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
         :initial-breakpoint="0.7">
         <ion-content style="--background: transparent">
            <v-card height='700' class='pa-0 rounded-t-lg app-item-color'>
               <v-card-title class='py-4 text-center my-border my-title'>
                  {{ offersDetails[0].user.name }}
                  <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                     +380 123 4567
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                     Вартість: {{ selectedOrder.total_price }} грн
                  </v-list-item-subtitle>
               </v-card-title>
               <v-list class='pa-5 h-100 bg-transparent'>
                  <app-product v-for="offer in offersDetails" :key="offer.id" :offer='offer' :is-hide-seller="true" :order-info="{
         hideIcons: selectedOrder.status === 'SUBMITTED',
         order: selectedOrder
      }" class='app-bg-color-form' />
               </v-list>
            </v-card>
         </ion-content>
      </ion-modal>
   </purchase-history-layout>
</template>

<script lang='ts' setup>
import AppOrder from '@/components/AppOrder.vue'
import AppProduct from '@/components/AppProduct.vue'
import { useRouting } from '@/composables'
import PurchaseHistoryLayout from '@/layouts/PurchaseHistoryLayout.vue'
import { Offer, Order, OrderById } from '@/models'
import { requestService } from '@/services'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { IonContent, IonModal, onIonViewWillEnter } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { setCart } = cartStore

const farmStore = useFarmStore()
const { populateFarms } = farmStore

const orderStore = useOrderStore()
const { populateOrders } = orderStore
const { orders } = storeToRefs(orderStore)

const offerStore = useOfferStore()
const { populateOffers } = offerStore
const { offers } = storeToRefs(offerStore)

onIonViewWillEnter(async () => {
   await setCart()
   await populateFarms()
   await populateOrders()
   await populateOffers()
})

const isOpen = ref(false)

const modalDismissed = () => {
   isOpen.value = false
}

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
</script>

<style lang='scss' scoped>
.no-item-title {
   font-size: 21px;
   white-space: normal;
   line-height: 1;
   margin-top: 15px;
   margin-bottom: 5px;
}

.order-title {
   font-size: 19px;
   margin-bottom: 10px;
   margin-left: 3px;
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

.cart-image {
   margin: 0 auto;
}
</style>