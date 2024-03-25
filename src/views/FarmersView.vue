<template>
   <farmers-layout>
      <v-list density="compact" class="py-0 pb-3 bg-transparent">
         <app-farmer :farmer="{
            name: 'Тарас Іванин',
            city: 'місто Полтава',
            images: ['https://matla-flowers.com.ua/image/cache/catalog/vesna2021/401215-1000x1000.jpg', 'https://i2.wp.com/www.jagodnik.info/wp-content/uploads/2021/03/kavun.jpeg?fit=665%2C445', 'https://noviydoctor.com/wp-content/uploads/2023/08/pomydor.jpg', 'https://semena.in.ua/content/images/32/480x384l50nn0/25338344968769.jpeg', 'https://cdnn1.inosmi.ru/img/24925/70/249257060_0:46:1920:1006_1920x0_80_0_0_752a4a412248663c4b79119e5be2d73b.jpg']
         }" :key="1"></app-farmer>

         <app-farmer :farmer="{
            name: 'Тарас Іванин',
            city: 'місто Полтава',
            images: ['https://matla-flowers.com.ua/image/cache/catalog/vesna2021/401215-1000x1000.jpg', 'https://i2.wp.com/www.jagodnik.info/wp-content/uploads/2021/03/kavun.jpeg?fit=665%2C445', 'https://noviydoctor.com/wp-content/uploads/2023/08/pomydor.jpg', 'https://semena.in.ua/content/images/32/480x384l50nn0/25338344968769.jpeg', 'https://cdnn1.inosmi.ru/img/24925/70/249257060_0:46:1920:1006_1920x0_80_0_0_752a4a412248663c4b79119e5be2d73b.jpg']
         }" :key="1"></app-farmer>
      </v-list>
      <!-- <v-sheet v-else class='mx-auto pa-5 pt-6 rounded-lg'>
         <div class="d-flex">
            <img width='45%' class="cart-image" src='https://cdn-icons-png.flaticon.com/512/5102/5102639.png'>
         </div>
         <v-list-item-title class='no-item-title text-center py-0'>
            Немає жодного фермера
         </v-list-item-title>
         <v-btn class='text-white mt-4 w-100 rounded-lg app-color btn-text' @click='routing.toCatalog()' variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet> -->

      <ion-modal :is-open="isOpen" @ionModalDidDismiss="modalDismissed" :handle="false" :initial-breakpoint="1"
         :breakpoints="[0, 1]">
         <v-card
            :height="`${selectedOrder.status === 'SHIPPING' || selectedOrder.status === 'DECLINED' ? '600' : '576'}`"
            class='pa-0 rounded-t-lg app-item-color'>
            <v-card-title class='py-4 text-center my-border my-title'>
               {{ offersDetails[0].user.name }}
               <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                  {{ offersDetails[0].user.phone_number }}
                  <!-- 095 823 4163 -->
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
      </ion-modal>
   </farmers-layout>
</template>

<script lang='ts' setup>
import AppFarmer from '@/components/AppFarmer.vue'
import AppProduct from '@/components/AppProduct.vue'
import { useRouting } from '@/composables'
import FarmersLayout from '@/layouts/FarmersLayout.vue'
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
   selectedOrder.value = orderResponse
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
.history-title {
   font-weight: 600;
   font-size: 18px;
   line-height: 150%;
   letter-spacing: -0.01em;
   text-align: center;
   color: var(--color-dark);
   margin-bottom: 5px;
   margin-top: 50px;
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