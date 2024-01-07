<template>
   <div class='pa-4 pr-3 rounded-xl product-item app-item-color d-flex justify-space-between align-center'>
      <div class="d-flex justify-space-between align-center">
         <img width="128" :src="linkIMG + '/' + offer.image" alt="Product image" class="product-image">
         <div class="ml-4">
            <v-list-item-title class='my-font-size my-color my-sub-margin'>
               {{ offer.title }}
            </v-list-item-title>
            <v-list-item-subtitle class='my-subtitle-fs my-margin'>
               Андрій
            </v-list-item-subtitle>
            <v-list-item-subtitle class='my-subtitle-fs'>
               Рєпіна 7
               <v-icon icon="mdi-map-marker" size='15' class='text-black my-margin'></v-icon>
            </v-list-item-subtitle>
            <v-list-item-title class='my-subtitle-fs my-color my-height'>
               {{ offer.price }} грн за {{ translate(offer?.unit) }}
            </v-list-item-title>
         </div>
      </div>
      <div class="d-flex align-center">
         <v-icon 
            class="text-grey-darken-1" 
            icon="mdi-minus-circle-outline" 
            size='34' 
            color='black'
         ></v-icon>
         <v-list-item-subtitle class='my-font-size mx-2 font-weight-bold text-center'>
            {{ getProductAmount(offer.id) }} {{ getProductAmount(offer.id) ? translate(offer?.unit) : '' }}
         </v-list-item-subtitle>
         <v-icon 
            class="text-grey-darken-1" 
            icon="mdi-plus-circle-outline" 
            size='34' 
            color='black'
            @click="addProductToCart(offer)"
         ></v-icon>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { useTranslate } from '@/composables'
import type { CreateOrder, CreateOrderItem, Offer, UpdateOrderItem } from "@/models"
import { requestService } from '@/services'
import { useOrderStore } from '@/stores'
// import { productStore } from "@/stores/product-store.ts"
// import { useRouting } from '@/composables'

defineProps<{
   offer: Offer
}>()

const orderStore = useOrderStore()
const {populateOrders, getDraftOrder, getProductAmount} = orderStore

populateOrders()

const request = requestService()

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const { translate } = useTranslate()

// const routing = useRouting()

// const showProductOnMap = (product: Offer) => {
//    cartStore.setSelectedProduct(product)
//    routing.toMap()
// }

const addProductToCart = async (offer: Offer) => {
   const cart = getDraftOrder()
   if(cart) {
      const selectedProduct = cart.order_items.find(item => item.offer_id === offer.id)
      if(selectedProduct) {
         const body: UpdateOrderItem = {
            id: selectedProduct.id,
            amount: selectedProduct.amount + 1
         }
         await request.updateOrderItem(body)
         populateOrders()
      } else {
         const body: CreateOrderItem = {
            id: cart.id,
            offer_id: offer.id,
            amount: 1
         }
         await request.createOrderItem(body)
         populateOrders()
      }
   } else {
      const body: CreateOrder = {
      order_items: [
      {
         offer_id: offer.id,
         amount: 1
      }
      ],
      address_id: 1,
      comment: '',
      shipping_price: 0
   }

   await request.createOrder(body)
   }
}
</script>

<style scoped>
.my-margin {
   margin-bottom: 2px;
}

.my-sub-margin {
   margin-bottom: 3px;
}

.v-list-item {
   padding-top: 14px;
   padding-bottom: 14px;
}

.product-image {
   width: 80px;
   height: 80px;
   object-fit: cover;
   border-radius: 100%;
}
</style>