<template>
   <cart-layout>
      <v-list v-if='cart?.order_items.length' @touchmove.stop max-height="407" class='pa-0 pb-5 bg-transparent'>
         <div class="d-flex justify-end clear-cart">Очистити кошик</div>
         <app-cart-item v-for="item in cart.order_items" :key="item.id" :offer='item.offer' class='app-bg-color-form' />
         <v-divider class="mx-4"></v-divider>
         <div class="info-price d-flex justify-space-between">
            <p class="total-sum-title"> Сума до замовлення:</p>
            <p class="total-sum">
               {{ cart?.product_price }}₴
            </p>
         </div>
         <div class="text-center">
            <v-btn class="order-btn">Оформити замовлення</v-btn>
         </div>
      </v-list>
      <template v-else>
         <div class="d-flex mt-5">
            <img class="cart-image" src='https://cdn-icons-png.flaticon.com/512/5102/5102639.png'>
         </div>
         <v-list-item-title class='mx-5 pb-1 no-item-title text-center'>
            Немає жодного товару
         </v-list-item-title>
      </template>
      <v-card-actions @touchmove.stop class="d-flex justify-center pt-0 px-5">
         <v-btn block v-if='cart?.order_items.length' color='orange' class='text-white mx-5 my-5 rounded-lg btn-text'
            @click='goToPayment' variant='flat'>
            Оформити замовлення
         </v-btn>
         <v-btn v-else block class='text-white mx-5 my-5 mt-4 rounded-lg app-color btn-text' @click='goToCatalog'
            variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-card-actions>
   </cart-layout>
</template>

<script lang='ts' setup>
import AppCartItem from '@/components/AppCartItem.vue'
import { useRouting } from '@/composables'
import CartLayout from '@/layouts/CartLayout.vue'
import { Offer, Order, OrderById } from '@/models'
import { requestService } from '@/services'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { onIonViewWillEnter } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)
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

const goToCatalog = () => {
   isOpen.value = false
   routing.toCatalog()
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

.clear-cart {
   font-weight: 400;
   font-size: 12px;
   line-height: 120%;
   color: var(--color-primary);
   margin-right: 17.2px;
   margin-top: 20px;
}

.order-btn {
   text-transform: none;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   background: var(--color-primary);
   color: white;
   border-radius: 40px;
   padding: 10px 48px;
   width: 226px;
   height: 41px;
   letter-spacing: 0;
   font-family: var(--font-family);
   font-weight: 600;
   font-size: 14px;
   line-height: 150%;
   color: var(--color-white);
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