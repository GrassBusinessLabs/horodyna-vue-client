<template>
   <div @click='detailsHandler(order)' class="app-item-color d-flex justify-space-between align-center" :class="{'one-image-order': order.order_items.length === 1}">
      <div class="d-flex justify-space-between align-center">

         <div v-if="order.order_items.length === 4">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.order_items[0].offer.image">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.order_items[1].offer.image">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.order_items[2].offer.image">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.order_items[3].offer.image">
         </div>

         <div v-else-if="order.order_items.length === 3">
            <img class="product-image3" alt="Product image" :src="linkIMG + '/' + order.order_items[0].offer.image">
            <img class="product-image3" alt="Product image" :src="linkIMG + '/' + order.order_items[1].offer.image">
            <img class="product-image3" alt="Product image" :src="linkIMG + '/' + order.order_items[2].offer.image">
         </div>

         <div v-else-if="order.order_items.length === 2">
            <img class="product-image2" alt="Product image" :src="linkIMG + '/' + order.order_items[0].offer.image">
            <img class="product-image2" alt="Product image" :src="linkIMG + '/' + order.order_items[1].offer.image">
         </div>

         <div v-else-if="order.order_items.length === 1">
            <img class="product-image1" alt="Product image" :src="linkIMG + '/' + order.order_items[0].offer.image">
         </div>

         <div v-else>
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.order_items[0].offer.image">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.order_items[1].offer.image">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.order_items[2].offer.image">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.order_items[3].offer.image">
         </div>

         <div class="order-info" :class="{'one-image-order-info': order.order_items.length === 1}">
            <p class='my-font-size order-status'
               :class="order.status === 'DECLINED' ? 'declined' : (order.status === 'SUBMITTED' ? 'waiting' : (order.status === 'COMPLETED' ? 'completed' : ''))">
               {{ order.status === 'SUBMITTED' ? 'Очікує' :
      (order.status === 'APPROVED' ? 'Схвалено' :
         (order.status === 'DECLINED' ? 'Відхилено' :
            (order.status === 'SHIPPING' ? 'Надіслано' : 'Отримано'))) }}
            </p>
            <v-list-item-title class='order-seller'>
               {{ orderSeller(order.order_items[0].farm.id) }}
            </v-list-item-title>
            <v-list-item-title class='my-margin order-price'>
               {{ order.total_price }} UAH
            </v-list-item-title>
         </div>
      </div>
   </div>
</template>

<script setup lang='ts'>
import { Offer, Order, OrderById } from '@/models'
import { useFarmStore } from '@/stores'

defineProps<{
   order: OrderById,
   relatedOffers: Offer[]
}>()

const farmStore = useFarmStore()
const { getFarmAddress } = farmStore

const orderSeller = (farmId: number) => {
   const foundFarm = getFarmAddress(farmId)
   const sellerName = foundFarm?.user.name
   return sellerName
}

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const emit = defineEmits<{
   (e: 'orderDetails', address: Order): void
}>()

function detailsHandler(event: Order): void {
   emit('orderDetails', event)
}
</script>

<style scoped>
.my-font-size {
   font-size: 17.8;
}

.product-image {
   width: 32px;
   height: 32px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: -12px;
   margin-bottom: -6px;
   border: 2px solid #f9f9f9;
}

.product-image:last-child {
   margin-right: -8px;
}

.product-image3 {
   width: 35px;
   height: 35px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: -7px;
   margin-bottom: -7px;
   border: 2px solid #f9f9f9;
}

.product-image2 {
   width: 31px;
   height: 31px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: -13px;
   margin-bottom: -7px;
   border: 2px solid #f9f9f9;
   margin-left: -1px;
}

.product-image1 {
   width: 37px;
   height: 37px;
   object-fit: cover;
   border-radius: 100%;
   margin-bottom: -7px;
   border: 2px solid #f9f9f9;
   margin-left: 5px;
}

.product-image2:last-child {
   margin-right: -5px;
}

.app-item-color {
   padding: 10px 15px 10px 15px;
   margin-bottom: 11px;
   position: relative;
   border-radius: 18px;
}

.one-image-order {
   padding: 9px 15px 9px 15px;
}

.v-col {
   width: 50px !important;
}

.order-info {
   margin-left: 16px;
}

.one-image-order-info {
   margin-left: 16px;
}

.order-status {
   position: absolute;
   top: 7px;
   right: 6px;
   background-color: rgb(0, 194, 32);
   color: white;
   border-radius: 25px;
   padding: 1px 8px;
}

.order-price {
   font-size: 18px;
   font-weight: 500;
   color: #000099a1;
}

.order-seller {
   margin-top: 4px;
   font-size: 16px;
   height: 16px;
   display: flex;
   align-items: center;
   color: rgba(0, 0, 0, 0.356);
   font-weight: 500;
}

.declined {
   background-color: rgba(226, 34, 0, 0.699);
}

.waiting {
   background-color: rgb(168, 168, 168);
}

.completed {
   background-color: rgba(168, 168, 168, 0.877);
}
</style>