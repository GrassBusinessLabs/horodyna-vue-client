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
               <v-list-item 
                  v-for="offer in offersDetails"
                  :key='offer?.id'
                  class='pa-4 rounded-xl product-item app-item-color'
               >
                  <template v-slot:prepend>
                     <img width="128" :src="linkIMG + '/' + offer?.image" alt="Product image" class="product-image">
                  </template>

                  <v-list-item-title class='my-font-size my-color my-sub-margin'>
                     {{ offer?.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                     class='my-subtitle-fs my-margin'
                  >
                     {{ offer?.user.name }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                     class='my-subtitle-fs'
                  >
                     Рєпіна 7
                     <v-icon
                        icon="mdi-map-marker"
                        size='15'
                        class='text-black my-margin'
                     ></v-icon>
                  </v-list-item-subtitle>
                  <v-list-item-title class='my-subtitle-fs my-color my-height'>
                     {{ offer?.price }} за {{ translate(offer?.unit) }}
                  </v-list-item-title>

                  <template v-slot:append>
                     <v-list-item-subtitle class='my-subtitle pa-2 font-weight-bold'>
                        2 {{ translate(offer?.unit) }}
                     </v-list-item-subtitle>
                  </template>
               </v-list-item>
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </orders-layout>
</template>

<script lang='ts' setup>
import AppOrder from '@/components/AppOrder.vue'
import OrdersLayout from '@/layouts/OrdersLayout.vue'
import { useOrderStore } from '@/stores/order-store.ts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { Offer, Order, OrderById } from '@/models'
import { useOfferStore } from '@/stores'
import { useRouting, useTranslate } from '@/composables'
import { requestService } from '@/services'

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const request = requestService()

const routing = useRouting()

const { translate } = useTranslate()

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

const offersDetails = ref<Partial<Offer[] | undefined>>([])

const showOrderDetails = async (order: Order) => {
   const orderResponse = await request.getOrderById(order.id)
   selectedOrder.value = orderResponse
   const relatedOffers = offers.value?.filter(offer => orderResponse.order_items.some(item => item.offer_id === offer.id))
   offersDetails.value = relatedOffers
   sheet.value = true
}
</script>

<style lang='scss' scoped>
.my-order-title {
   font-size: 24px;
}

.no-item-title {
   font-size: 23.5px;
}

.product-image {
   width: 80px;
   height: 80px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: 15px;
}
</style>