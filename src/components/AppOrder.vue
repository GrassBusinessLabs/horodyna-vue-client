<template>
   <div @click='detailsHandler(order)' class="order-block">
      <div class="top-block d-flex">
         <div>
            <img class="order-image" alt="Product image"
               src="https://companynewheroes.com/wp-content/blogs.dir/18/files/2019/09/Lucas-De-Man-Fotograaf-Anne-Harbers-2-1024x683.jpg">
         </div>
         <div class="order-text-block">
            <p class="order-seller">{{ orderSeller(order.order_items[0].farm.id) }}</p>
            <p class="order-date">{{ formattedDate }}</p>
            <p class='order-items-quantity'>Найменувань: {{ order.order_items.length }}</p>
         </div>
      </div>
      <div class="d-flex">
         <p v-for="(item, index) in order.order_items" :key="item.id" class="order-item-title">{{ item.offer.title }}{{
      index === order.order_items.length - 1 ? '' : ', ' }}</p>
      </div>
      <div class="divider"></div>
      <div class="bottom-block mt-2 d-flex justify-space-between align-center">
         <div class="info-price d-flex justify-space-between">
            <p class="order-sum"> Сума:</p>
            <p class="order-sum ml-1">
               {{ order.product_price }}₴
            </p>
         </div>
         <div class="order-details-text d-flex align-center">Деталі замовлення <svg class="ml-1 svg-arrow" width="8"
               height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g clip-path="url(#clip0_2647_1504)">
                  <path
                     d="M2.70547 0.705384C2.3159 0.315811 1.68428 0.315811 1.2947 0.705384C0.905431 1.09466 0.905087 1.72569 1.29393 2.11538L4.46529 5.29366C4.85479 5.68401 4.85479 6.31599 4.46529 6.70634L1.29393 9.88462C0.905087 10.2743 0.905431 10.9053 1.2947 11.2946C1.68428 11.6842 2.3159 11.6842 2.70547 11.2946L7.29298 6.70711C7.68351 6.31658 7.68351 5.68342 7.29298 5.29289L2.70547 0.705384Z"
                     fill="#529075" />
               </g>
               <defs>
                  <clipPath id="clip0_2647_1504">
                     <rect width="8" height="12" fill="white" />
                  </clipPath>
               </defs>
            </svg></div>
      </div>
   </div>
</template>

<script setup lang='ts'>
import { Offer, Order, OrderById } from '@/models'
import { useFarmStore } from '@/stores'
import { onMounted, ref } from 'vue'

const props = defineProps<{
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

const formattedDate = ref('')

onMounted(() => {
   const originalDate = props.order.created_data
   const dateObj = new Date(originalDate)
   const day = dateObj.getDate()
   const month = dateObj.getMonth() + 1
   const year = dateObj.getFullYear()
   const hours = dateObj.getHours()
   const minutes = dateObj.getMinutes()

   const formattedDay = day < 10 ? `0${day}` : `${day}`
   const formattedMonth = month < 10 ? `0${month}` : `${month}`

   formattedDate.value = `${formattedDay}.${formattedMonth}.${year}, ${hours}:${minutes}`
})
</script>

<style scoped>
.top-block {
   margin-bottom: 1px;
}

.order-sum {
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-dark);
}

.order-details-text {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   color: var(--color-primary);
}

.svg-arrow {
   margin-top: 2px;
}

.order-block {
   margin: 20px 15px;
   margin-bottom: 20px;
   margin-left: 17.2px;
   width: 91.5%;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   border-radius: 8px;
   background-color: white;
   padding: 14px;
   padding-bottom: 12px;
}

.order-text-block {
   margin-left: 12px;
}

.order-price {
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
   margin-top: 5px;
   margin-bottom: 5px;
}

.order-seller {
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
   margin-bottom: 1px;
   margin-top: 3px;
}

.order-date {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   color: var(--color-dark);
   margin-bottom: 3px;
}

.order-items-quantity {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   color: var(--color-light);
}

.order-item-title {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   color: var(--color-light);
   margin-right: 3px;
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

.divider {
   margin: 9px 0;
}

.my-font-size {
   font-size: 17.8;
}

.order-image {
   width: 64px;
   height: 64px;
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