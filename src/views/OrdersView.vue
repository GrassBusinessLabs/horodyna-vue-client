<template>
   <orders-layout>
      <v-list v-if="temporaryOrders" density="compact" class="py-0 bg-transparent">
         <v-list-item-title class="order-title">
            Очікують підтвердження <v-icon size="20" icon="mdi-clock-time-eight"></v-icon>
         </v-list-item-title>
         <app-farm-order v-for="order in temporaryOrders.splited_orders" :order='order' :key="order.id"
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
                  Деталі замовлення
                  <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                     Вартість: {{ selectedOrder.total_price }} грн
                  </v-list-item-subtitle>
               </v-card-title>
               <v-list class='pa-5 h-100 bg-transparent'>
                  <app-product v-for="offer in offersDetails" :key="offer.id" :offer='offer' :order-info="{
                     hideIcons: false,
                     order: selectedOrder
                  }" class='app-bg-color-form' />
                  <v-card-actions class="pa-0 pr-4">
                     <v-btn color='indigo' class='text-white rounded-lg w-50 mr-2' @click='deleteSplittedOrder' variant='outlined'>
                     Видалити
                  </v-btn>
                     <v-btn class='text-white rounded-lg w-50 app-color' @click='goToPayment' variant='flat'>
                    До замовлення
                  </v-btn>
                  </v-card-actions>
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
import { Offer, OrderById } from '@/models'
import { requestService } from '@/services'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { IonContent, IonModal, onIonViewWillEnter } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { setCart } = cartStore
const { cart } = storeToRefs(cartStore)

const farmStore = useFarmStore()
const { populateFarms } = farmStore

const orderStore = useOrderStore()
const { populateOrders, setSelectedOrder } = orderStore

const offerStore = useOfferStore()
const { populateOffers } = offerStore
const { offers } = storeToRefs(offerStore)

const temporaryOrders = ref()

onIonViewWillEnter(async () => {
   await setCart()
   await populateFarms()
   await populateOrders()
   await populateOffers()
   temporaryOrders.value = await request.getSplitOrders(cart.value?.id ? cart.value.id : -1)
})

const isOpen = ref(false)

const modalDismissed = () => {
   isOpen.value = false
}

const selectedOrder = ref<Partial<OrderById>>({})

const offersDetails = ref<Offer[]>([])

const showOrderDetails = async (order: OrderById) => {
   selectedOrder.value = order
   const relatedOffers = offers.value?.filter(offer => order.order_items.some(item => item.offer_id === offer.id))
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

const deleteSplittedOrder = async () => {
   await request.deleteSplittedOrder(cart.value?.id ? cart.value.id : -1, selectedOrder.value.order_items ? selectedOrder.value?.order_items[0].farm.id : -1)
   temporaryOrders.value = await request.getSplitOrders(cart.value?.id ? cart.value.id : -1)
   isOpen.value = false
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
</style>