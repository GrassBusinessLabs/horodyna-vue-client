<template>
   <div @click='detailsHandler(order)' class="order-block">
      <div class="top-block d-flex">
         <div>
            <img class="order-image" alt="Product image" :src="linkIMG + '/' + order.order_items[0].offer.image">
         </div>
         <div class="order-text-block">
            <p class="order-price">{{ order.total_price }} UAH</p>
            <p class="order-seller">{{ orderSeller(order.order_items[0].farm.id) }}</p>
            <p class='order-status'
               :class="order.status === 'DECLINED' ? 'declined' : (order.status === 'SUBMITTED' ? 'waiting' : (order.status === 'COMPLETED' ? 'completed' : ''))">
               <span class="text-grey">Статус:</span> {{ order.status === 'SUBMITTED' ? 'Очікує' :
      (order.status === 'APPROVED' ? 'Схвалено' :
         (order.status === 'DECLINED' ? 'Відхилено' :
            (order.status === 'SHIPPING' ? 'Надіслано' : 'Отримано'))) }}
            </p>
         </div>
      </div>
      <v-divider></v-divider>
      <div class="bottom-block mt-4">
         <img v-for="item in order.order_items.filter((_, index) => index !== 0)" :key="item.id" class="order-image order-image-list-item" alt="Product image" :src="linkIMG + '/' + item.offer.image">
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
.order-block {
   margin: 19px 15px;
   margin-bottom: 21px;
   margin-left: 17.2px;
   width: 91.5%;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   border-radius: 8px;
   background-color: white;
   padding: 14px;
}

.order-text-block {
   margin-left: 12px;
}

.order-price {
   font-family: var(--font-family);
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
   margin-top: 5px;
   margin-bottom: 5px;
}

.order-seller {
   font-family: var(--font-family);
   font-weight: 400;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-light);
   margin-bottom: 2.5px;
}

.order-status {
   color: white;
   border-radius: 25px;
   font-family: var(--font-family);
   font-weight: 400;
   font-size: 16px;
   line-height: 120%;
   color: rgb(0, 194, 32);
}

.v-divider {
   margin: 9px 0;
}

.my-font-size {
   font-size: 17.8;
}

.order-image {
   width: 75px;
   height: 75px;
   object-fit: cover;
   border-radius: 10px;
   border: 2px solid #f9f9f9;
}

.bottom-block {
   display: flex;
   overflow-x: auto;
}

.order-image-list-item {
   margin-right: 10px;
}

.order-image-list-item:last-child {
   margin-right: 0;
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

.declined {
   color: rgba(226, 34, 0, 0.699);
}

.waiting {
   color: rgb(91, 91, 255);
}

.completed {
   color: rgb(91, 91, 255);
}
</style>