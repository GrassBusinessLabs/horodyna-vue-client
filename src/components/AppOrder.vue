<template>
   <div @click='detailsHandler(order)' class="app-item-color d-flex justify-space-between align-center">
      <div class="d-flex justify-space-between align-center">
         <!-- <img v-for="offer in relatedOffers" class="product-image" alt="Product image" :key="offer.id" size="70"
            :src="linkIMG + '/' + offer.image"> -->
         <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
         <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
         <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
         <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
         <div class="order-info">
            <p class='my-font-size order-status' :class="order.status === 'DECLINED' ? 'declined' : (order.status === 'SUBMITTED' ? 'waiting' : (order.status === 'COMPLETED' ? 'completed' : ''))">
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

const props = defineProps<{
   order: OrderById,
   relatedOffers: Offer[]
}>()

const farmStore = useFarmStore()
const {getFarmAddress} = farmStore

const orderSeller = (farmId: number) => {
   const foundFarm = getFarmAddress(farmId)
   const sellerName = foundFarm?.user.name
   return sellerName
}

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const dateObject = new Date(props.order.created_data)
const formattedDate = dateObject.toLocaleString('uk-UA', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long' })

const images = [
   { image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg' },
   { image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg' },
   { image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg' },
   { image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg' },
   { image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg' },
   { image: 'https://tut-cikavo.com/images/Nauka/tomatos.jpg' },
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
   width: 30px;
   height: 30px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: -8px;
   margin-bottom: -2px;
   border: 2px solid white;
}

.app-item-color {
   padding: 10px 15px 10px 15px;
   margin-bottom: 11px;
   position: relative;
   border-radius: 18px;
}

.v-col {
   width: 50px !important;
}

.order-info {
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
   background-color: rgba(226, 34, 0, 0.781);
}

.waiting {
   background-color: rgb(168, 168, 168);
}

.completed {
   background-color: rgba(168, 168, 168, 0.877);
}
</style>