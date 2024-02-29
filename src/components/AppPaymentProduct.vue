<template>
   <div :class="{'inactive-offer': !offer.status}" class='d-flex justify-space-between align-center payment-product'>
      <div class="d-flex justify-space-between align-center">
         <img width="128" :src="linkIMG + '/' + offer.image" alt="Product image" :class="`product-image ${offer.status ? '' : 'gray-scale'}`">
         <div class="ml-2">
            <v-list-item-title class='offer-title'>
               {{ offer.title }}
            </v-list-item-title>
         </div>
      </div>
      <div v-if="offer.status" class="d-flex align-center">
         <v-list-item-subtitle class='my-font-size py-1 font-weight-medium text-center product-counter' :class="{'order-amount': orderInfo?.hideIcons}">
            {{ orderInfo?.hideIcons ? getOrderItemAmount() : getProductAmount(offer.id) }} 
            {{ !orderInfo?.hideIcons ? (getProductAmount(offer.id) ? translate(offer?.unit) : '') : (orderInfo?.hideIcons ? translate(offer?.unit) : '') }}
         </v-list-item-subtitle>
      </div>
      <div class="inactive-title text-center mr-1 font-weight-medium" v-else>Немає в наявності</div>
   </div>
</template>

<script lang="ts" setup>
import { useTranslate } from '@/composables'
import type { Offer, OrderById } from "@/models"
import { useOrderStore } from '@/stores'

interface OrderInfo {
   hideIcons: boolean,
   order: OrderById
}

const props = defineProps<{
   offer: Offer,
   orderInfo?: OrderInfo
}>()

const orderStore = useOrderStore()
const {getProductAmount} = orderStore

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const { translate } = useTranslate()

const getOrderItemAmount = () => {
   const foundOrderItem = props.orderInfo?.order.order_items.find(item => item.offer_id === props.offer.id)
   return foundOrderItem?.amount
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
   width: 35px;
   height: 35px;
   object-fit: cover;
   border-radius: 12px;
   margin: 5px 0;
}

.v-list-item-title {
   max-width: 170px;
   white-space: normal;
   line-height: 1.1;
}

.v-list-item-subtitle {
   max-width: 160px;
}

.order-amount {
   font-size: 22px;
   max-width: 40px !important;
}

.inactive-offer {
   opacity: 70%;
}

.inactive-title {
   width: 90px;
   font-size: 18px;
   opacity: 80%;
}

.payment-product {
   background-color: rgb(247, 247, 247);
   padding: 7px 11px;
   border-radius: 17px;
   margin-bottom: 11px;
}

.offer-title {
   font-size: 17px;
}
</style>