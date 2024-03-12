<template>
   <div @click='detailsHandler(order)' class="app-item-color d-flex justify-space-between align-center" :class="{'one-image-order': false}">
      <div class="d-flex justify-space-between align-center">
         <!-- <img v-for="image in order.images" class="product-image" alt="Product image" :key="offer.id"
            :src="linkIMG + '/' + image"> -->

         <!-- <div>
            <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
         </div> -->

         <!-- <div v-if="order.images.length === 4">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.images[0]">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.images[1]">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.images[2]">
            <img class="product-image" alt="Product image" :src="linkIMG + '/' + order.images[3]">
         </div>

         <div v-else-if="order.images.length === 3">
            <img class="product-image3" alt="Product image" :src="linkIMG + '/' + order.images[0]">
            <img class="product-image3" alt="Product image" :src="linkIMG + '/' + order.images[1]">
            <img class="product-image3" alt="Product image" :src="linkIMG + '/' + order.images[2]">
         </div>

         <div v-else-if="order.images.length === 2">
            <img class="product-image2" alt="Product image" :src="linkIMG + '/' + order.images[0]">
            <img class="product-image2" alt="Product image" :src="linkIMG + '/' + order.images[1]">
         </div>

         <div v-else>
            <img class="product-image1" alt="Product image" :src="linkIMG + '/' + order.images[0]">
         </div> -->

         <div v-if="order.id === 65">
            <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            <img class="product-image" alt="Product image" src="https://today.ua/wp-content/uploads/2023/10/kartofel.jpg">
            <img class="product-image" alt="Product image" src="https://images.unian.net/photos/2023_01/thumb_files/1000_545_1675013478-2668.jpg?1">
            <img class="product-image" alt="Product image" src="https://content2.rozetka.com.ua/goods/images/big/178661066.jpg">
         </div>

         <div v-else-if="order.id === 67">
            <img class="product-image3" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            <img class="product-image3" alt="Product image" src="https://today.ua/wp-content/uploads/2023/10/kartofel.jpg">
            <img class="product-image3" alt="Product image" src="https://images.unian.net/photos/2023_01/thumb_files/1000_545_1675013478-2668.jpg?1">
         </div>

         <div v-else-if="order.id === 68">
            <img class="product-image2" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            <img class="product-image2" alt="Product image" src="https://today.ua/wp-content/uploads/2023/10/kartofel.jpg">
         </div>

         <div v-else>
            <img class="product-image" alt="Product image" src="https://tut-cikavo.com/images/Nauka/tomatos.jpg">
            <img class="product-image" alt="Product image" src="https://today.ua/wp-content/uploads/2023/10/kartofel.jpg">
            <img class="product-image" alt="Product image" src="https://images.unian.net/photos/2023_01/thumb_files/1000_545_1675013478-2668.jpg?1">
            <img class="product-image" alt="Product image" src="https://content2.rozetka.com.ua/goods/images/big/178661066.jpg">
         </div>

         <div class="order-info" :class="{'one-image-order-info': false}">
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
   width: 30px;
   height: 30px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: -8px;
   margin-bottom: -6px;
   border: 2px solid white;
}

.product-image3 {
   width: 37px;
   height: 37px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: -8px;
   margin-bottom: -7px;
   border: 2px solid white;
}

.product-image2 {
   width: 44px;
   height: 44px;
   object-fit: cover;
   border-radius: 100%;
   margin-right: -8px;
   margin-bottom: -7px;
   border: 2px solid white;
}

.product-image1 {
   width: 46px;
   height: 46px;
   object-fit: cover;
   border-radius: 100%;
   margin-bottom: -7px;
   border: 2px solid white;
}

.product-image2:last-child {
   margin-right: -1px;
}

.product-image2:first-child {
   margin-left: 7px;
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
   margin-left: 10px;
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