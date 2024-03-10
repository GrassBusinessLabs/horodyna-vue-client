<template>
   <div @click='detailsHandler(order)' class="rounded-xl app-item-color d-flex justify-space-between align-center">
      <div class="d-flex justify-space-between align-center">
         <!-- <img v-for="offer in relatedOffers" class="product-image" alt="Product image" :key="offer.id" size="70"
            :src="linkIMG + '/' + offer.image"> -->
         <v-row>
            <v-col class="pa-0 d-flex align-center mb-2" cols="12">
               <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
               <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
               <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            </v-col>
            <v-col class="pa-0 d-flex align-center" cols="12">
               <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
               <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
               <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            </v-col>
         </v-row>

         <div class="order-info">
            <v-list-item-title class='pb-1 my-font-size order-status'>
               {{ order.status === 'SUBMITTED' ? 'Статус: Очікує' :
      (order.status === 'APPROVED' ? 'Статус: Схвалено' :
         (order.status === 'DECLINED' ? 'Статус: Відхилено' :
            (order.status === 'SHIPPING' ? 'Статус: Надіслано' : 'Статус: Отримано'))) }}
            </v-list-item-title>
            <v-list-item-subtitle class='my-subtitle-fs'>
               {{ formattedDate }}
            </v-list-item-subtitle>
            <v-list-item-title class='py-1 my-margin my-color my-font-size'>
               Вартість: {{ order.total_price }} грн
            </v-list-item-title>
         </div>
      </div>
   </div>
</template>

<script setup lang='ts'>
import { Offer, Order, OrderById } from '@/models'

const props = defineProps<{
   order: OrderById,
   relatedOffers: Offer[]
}>()

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const dateObject = new Date(props.order.created_data)
const formattedDate = dateObject.toLocaleString('uk-UA', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long' })

const images = [
   {image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg'},
   {image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg'},
   {image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg'},
   {image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg'},
   {image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg'},
   {image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg'},
]

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
   width: 33px;
   height: 33px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: -5px;
   margin-bottom: -2px;
   border: 2px solid white;
}

.app-item-color {
   padding: 11px 15px 13px 28px;
   margin-bottom: 12px;
}

.v-col {
   width: 50px !important;
}

.order-info {
   margin-left: 13px;
}

.order-status {
   padding-top: 6px;
}
</style>