<template>
   <purchase-history-layout>
      <v-list v-if="activeOrders?.length || declinedOrders?.length || completedOrders?.length" density="compact"
         class="py-0 bg-transparent">
         <app-order
            v-for="order in orders?.filter(order => order.status !== 'COMPLETED' && order.status !== 'DRAFT' && order.status !== 'DECLINED')"
            :order='order' :key="order.id" @order-details='showOrderDetails(order)'></app-order>

         <div v-if="declinedOrders?.length" class="history-title">Відхилені замовлення</div>
         <app-order v-for="order in orders?.filter(order => order.status === 'DECLINED')" :order='order' :key="order.id"
            @order-details='showOrderDetails(order)' class="gotten-order"></app-order>

         <div v-if="completedOrders?.length" class="history-title">Історія замовлень</div>
         <app-order v-for="order in orders?.filter(order => order.status === 'COMPLETED')" :order='order'
            :key="order.id" @order-details='showOrderDetails(order)' class="gotten-order"></app-order>
      </v-list>
      <v-sheet v-else class='mx-auto pa-5 pt-6 rounded-lg'>
         <div class="d-flex">
            <img width='45%' class="cart-image" src='https://cdn-icons-png.flaticon.com/512/5102/5102639.png'>
         </div>
         <v-list-item-title class='no-item-title text-center py-0'>
            Немає жодного замовлення
         </v-list-item-title>
         <v-btn class='text-white mt-4 w-100 rounded-lg app-color btn-text' @click='routing.toCatalog()' variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet>

      <!-- <ion-modal :is-open="isOpen" @ionModalDidDismiss="modalDismissed" :handle="false" :initial-breakpoint="1"
         :breakpoints="[0, 1]">
         <v-card
            :height="`${selectedOrder.status === 'SHIPPING' || selectedOrder.status === 'DECLINED' ? '600' : '576'}`"
            class='pa-0 rounded-t-lg app-item-color'>
            <v-card-title class='py-4 text-center my-border my-title'>
               {{ offersDetails[0].user.name }}
               <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                  {{ offersDetails[0].user.phone_number }}
               </v-list-item-subtitle>
               <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                  Вартість: {{ selectedOrder.total_price }} грн
               </v-list-item-subtitle>
            </v-card-title>
            <v-list @touchmove.stop
               :max-height="`${selectedOrder.status === 'SHIPPING' || selectedOrder.status === 'DECLINED' ? '380' : '409'}`"
               class='pa-5 h-100 bg-transparent py-0 mt-5'>
               <app-product v-for="offer in offersDetails" :key="offer.id" :offer='offer' :is-hide-seller="true"
                  :order-info="{
         hideIcons: selectedOrder.status !== 'COMPLETED',
         order: selectedOrder
      }" class='app-bg-color-form' />
            </v-list>
            <v-card-actions v-if="selectedOrder.status === 'SHIPPING'" @touchmove.stop
               class="d-flex justify-center pt-0 px-5 mark-completed">
               <v-btn block color='orange' class='text-white mx-5 my-5 rounded-lg btn-text' @click='markAsCompleted'
                  variant='flat'>
                  Позначити як отримане
               </v-btn>
            </v-card-actions>
            <v-card-actions v-else-if="selectedOrder.status === 'DECLINED'" @touchmove.stop
               class="d-flex justify-center pt-0 px-5 mark-completed">
               <v-btn block class='text-white mx-5 my-5 rounded-lg btn-text app-color' @click='deleteDeclinedOrder'
                  variant='flat'>
                  Видалити
               </v-btn>
            </v-card-actions>
         </v-card>
      </ion-modal> -->

      <ion-modal :is-open="isOpen" @ionModalDidDismiss="modalDismissed" :handle="false" :initial-breakpoint="1"
         :breakpoints="[0, 1]">
         <v-card @touchmove.stop
            class='pa-0'>
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
               <p>Замовлення №{{ selectedOrder.id }}</p>
            </div>
            <!-- <v-list @touchmove.stop
               class='pa-0 h-100 bg-transparent py-0 mt-3'>
               <app-order-item v-for="offer in offersDetails" :key="offer.id" :offer='offer' :is-hide-seller="true"
                  :order-info="{
         hideIcons: selectedOrder.status !== 'COMPLETED',
         order: selectedOrder
      }" class='app-bg-color-form' />
            </v-list> -->

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

               <div v-if="selectedOrder.status === 'SHIPPING'" class="text-center">
                  <v-btn class="app-btn">Позначити як отримане</v-btn>
               </div>
            </v-list>
            <!-- <v-card-actions v-if="selectedOrder.status === 'SHIPPING'" @touchmove.stop
               class="d-flex justify-center pt-0 px-5 mark-completed">
               <v-btn block color='orange' class='text-white mx-5 my-5 rounded-lg btn-text' @click='markAsCompleted'
                  variant='flat'>
                  Позначити як отримане
               </v-btn>
            </v-card-actions>
            <v-card-actions v-else-if="selectedOrder.status === 'DECLINED'" @touchmove.stop
               class="d-flex justify-center pt-0 px-5 mark-completed">
               <v-btn block class='text-white mx-5 my-5 rounded-lg btn-text app-color' @click='deleteDeclinedOrder'
                  variant='flat'>
                  Видалити
               </v-btn>
            </v-card-actions> -->
         </v-card>
      </ion-modal>
   </purchase-history-layout>
</template>

<script lang='ts' setup>
import AppOrder from '@/components/AppOrder.vue'
import AppOrderItem from '@/components/AppOrderItem.vue'
import { useRouting } from '@/composables'
import PurchaseHistoryLayout from '@/layouts/PurchaseHistoryLayout.vue'
import { Offer, Order, OrderById } from '@/models'
import { requestService } from '@/services'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { IonModal, onIonViewWillEnter } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { setCart } = cartStore

const farmStore = useFarmStore()
const { populateFarms } = farmStore

const orderStore = useOrderStore()
const { populateOrders, getCompletedOrders, getActiveOrders, getDeclinedOrders } = orderStore
const { orders } = storeToRefs(orderStore)

const offerStore = useOfferStore()
const { populateOffers } = offerStore
const { offers } = storeToRefs(offerStore)

const completedOrders = ref<Order[] | null>([])
const activeOrders = ref<Order[] | null>([])
const declinedOrders = ref<Order[] | null>([])

onIonViewWillEnter(async () => {
   await setCart()
   await populateFarms()
   await populateOrders()
   await populateOffers()
   completedOrders.value = getCompletedOrders()
   activeOrders.value = getActiveOrders()
   declinedOrders.value = getDeclinedOrders()
})

const isOpen = ref(false)

const modalDismissed = () => {
   isOpen.value = false
}

const selectedOrder = ref<Partial<OrderById>>({})

const offersDetails = ref<Offer[]>([])

const showOrderDetails = async (order: Order) => {
   const orderResponse = await request.getOrderById(order.id)
   selectedOrder.value = order
   const relatedOffers = offers.value?.filter(offer => orderResponse.order_items.some(item => item.offer.id === offer.id))
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

const markAsCompleted = async () => {
   request.markOrderAsCompleted(selectedOrder.value.id ? selectedOrder.value.id : -1, { status: "COMPLETED" })
   isOpen.value = false
   await new Promise(resolve => setTimeout(resolve, 1000))
   await populateOrders()
}

const deleteDeclinedOrder = async () => {
   request.deleteOrder(selectedOrder.value.id ? selectedOrder.value.id : -1)
   isOpen.value = false
   await new Promise(resolve => setTimeout(resolve, 1000))
   await populateOrders()
   declinedOrders.value = getDeclinedOrders()
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

.close-btn {
   position: absolute;
   top: 20px;
   right: 15px;
   z-index: 2;
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

.history-title {
   font-weight: 600;
   font-size: 18px;
   line-height: 150%;
   letter-spacing: -0.01em;
   text-align: center;
   color: var(--color-dark);
   margin-bottom: 5px;
   margin-top: 50px;
   opacity: 0.7;
}

.no-item-title {
   font-size: 21px;
   white-space: normal;
   line-height: 1;
   margin-top: 15px;
   margin-bottom: 5px;
}

.order-title {
   font-weight: 600;
   font-size: 17px;
   line-height: 120%;
   color: var(--color-dark);
   margin-left: 17.2px;
   margin-bottom: -10px;
}

.gotten-order {
   opacity: 0.7;
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

.v-card-actions {
   position: fixed;
   bottom: 15px;
   right: 0px;
   left: 0px;
}

.mark-completed {
   bottom: -7px;
}

.btn-text {
   padding-top: 4px !important;
   padding-bottom: 5px !important;
}
</style>