<template>
   <orders-layout>
      <v-list v-if="temporaryOrders" density="compact" class="py-2 bg-transparent">
         <app-order v-for="order in temporaryOrders.splited_orders" :is-splitted-order="true" :order='order' :key="order.id"
            @order-details='showOrderDetails(order)'></app-order>
      </v-list>
      <v-sheet v-else class='mx-auto pa-6 pt-5 rounded-lg'>
         <v-list-item-title class='no-item-title text-center py-0'>
            Немає жодного замовлення
         </v-list-item-title>
         <v-btn color='orange' class='text-white mt-4 w-100 rounded-lg btn-text' @click='routing.toCatalog()'
            variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet>

      <ion-modal :is-open="isOpen" @ionModalDidDismiss="modalDismissed" :handle="false" :initial-breakpoint="1"
         :breakpoints="[0, 1]">
         <v-card @touchmove.stop class='pa-0'>
            <svg @click="modalDismissed" class="close-btn" width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_28_536)">
                  <path
                     d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                     fill="white" />
               </g>
               <defs>
                  <clipPath id="clip0_28_536">
                     <rect width="24" height="24" fill="white" />
                  </clipPath>
               </defs>
            </svg>
            <div class="details-header d-flex align-center justify-center">
               <p>Замовлення</p>
            </div>

            <v-list @touchmove.stop class='pa-0 pb-5 pt-2 bg-transparent'>
               <app-order-item v-for="item in selectedOrder.order_items" :key="item.id" :offer='item.offer'
                  :amount="item.amount" class='app-bg-color-form' />
               <v-divider class="mx-4"></v-divider>
               <div class="info-price d-flex justify-space-between">
                  <p class="total-sum-title"> Сума до замовлення:</p>
                  <p class="total-sum">
                     {{ selectedOrder?.product_price }}₴
                  </p>
               </div>

               <div class="text-center mb-4">
                  <v-btn @click='deleteSplittedOrder' class="app-btn-outline">Видалити</v-btn>
               </div>
               <div class="text-center">
                  <v-btn @click='goToPayment' class="app-btn">До замовлення</v-btn>
               </div>
            </v-list>
         </v-card>
      </ion-modal>
   </orders-layout>
</template>

<script lang='ts' setup>
import AppOrder from '@/components/AppOrder.vue'
import AppOrderItem from '@/components/AppOrderItem.vue'
import { useRouting } from '@/composables'
import OrdersLayout from '@/layouts/OrdersLayout.vue'
import { Offer, OrderById } from '@/models'
import { requestService } from '@/services'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { IonModal, onIonViewWillEnter } from '@ionic/vue'
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
   const relatedOffers = offers.value?.filter(offer => order.order_items.some(item => item.offer.id === offer.id))
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
.total-sum-title {
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   color: #000;
}

.total-sum {
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   color: #000;
}

.info-price {
   padding: 14px 16px;
}

.details-header {
   height: 64px;
   width: 100%;
   background: var(--color-primary);
}

.details-header p {
   font-weight: 600;
   font-size: 18px;
   line-height: 150%;
   letter-spacing: -0.01em;
   text-align: center;
   color: var(--color-white);
}

ion-modal {
   --border-radius: 0;
}

.close-btn {
   position: absolute;
   top: 20px;
   right: 15px;
   z-index: 2;
}

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

.v-card-actions {
   position: fixed;
   bottom: 13px;
   right: 0px;
   left: 0px;
}

.btn-text {
   padding-top: 4px !important;
   padding-bottom: 5px !important;
}
</style>