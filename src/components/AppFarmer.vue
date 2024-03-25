<template>
   <div @click='detailsHandler(order)' class="order-block">
      <div class="top-block d-flex">
         <div>
            <img class="order-image" alt="Product image"
               src="https://www.realmenrealstyle.com/wp-content/uploads/2023/07/Glasses-for-Oval-shape-741x505.jpg">
         </div>
         <div class="farmer-info">
            <p class="farmer-name">{{ farmer.name }}</p>
            <p class="farmer-city">{{ farmer.city }}</p>
            <p class='farmer-time'>
               Відчинено до 20:00
            </p>
         </div>
      </div>
      <div class="divider"></div>
      <div class="bottom-block">
         <div class="farmer-offers d-flex align-center justify-center">
            <div class="d-flex flex-column align-center">
               <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M20.625 26C20.625 28.2094 19.3344 30 17.125 30H8.875C6.66563 30 5.375 28.2094 5.375 26M21.5 21C22.6044 21 23.5 22.1194 23.5 23.5C23.5 24.8806 22.6044 26 21.5 26H4.5C3.39562 26 2.5 24.8806 2.5 23.5C2.5 22.1194 3.39562 21 4.5 21"
                     stroke="#529075" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                  <path
                     d="M4.5 17.25V17.2362C4.5 13.7987 7.3125 12 10.75 12H15.25C18.6875 12 21.5 13.8125 21.5 17.25V17.2362M15.5625 7L16.0275 10.9981M22 21H11.7069C11.5744 21.0001 11.4474 21.0527 11.3538 21.1462L9.67688 22.8231C9.65366 22.8464 9.62609 22.8648 9.59574 22.8774C9.56539 22.89 9.53285 22.8964 9.5 22.8964C9.46715 22.8964 9.43461 22.89 9.40426 22.8774C9.37391 22.8648 9.34634 22.8464 9.32312 22.8231L7.64625 21.1462C7.55255 21.0527 7.42556 21.0001 7.29313 21H4C3.60218 21 3.22064 20.842 2.93934 20.5607C2.65804 20.2794 2.5 19.8978 2.5 19.5C2.5 19.1022 2.65804 18.7206 2.93934 18.4393C3.22064 18.158 3.60218 18 4 18H22C22.3978 18 22.7794 18.158 23.0607 18.4393C23.342 18.7206 23.5 19.1022 23.5 19.5C23.5 19.8978 23.342 20.2794 23.0607 20.5607C22.7794 20.842 22.3978 21 22 21Z"
                     stroke="#529075" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                  <path
                     d="M16.5 30H25.2069C25.7114 30 26.1974 29.8093 26.5672 29.4661C26.9371 29.1229 27.1636 28.6525 27.2013 28.1494L29.4375 7"
                     stroke="#529075" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                  <path d="M23.5 7L24.5 3L27.4375 2" stroke="#529075" stroke-width="1.5" stroke-linecap="round"
                     stroke-linejoin="round" />
                  <path d="M14.5 7H30.5" stroke="#529075" stroke-width="1.5" stroke-miterlimit="10"
                     stroke-linecap="round" />
               </svg>
               <p class="offers-title">Товари</p>
            </div>

         </div>
         <img v-for="item in farmer.images" :key="item" class="order-image order-image-list-item" alt="Product image"
            :src="item">
      </div>
   </div>
</template>

<script setup lang='ts'>
import { Order } from '@/models'
import { useFarmStore } from '@/stores'

interface Farmer {
   name: string,
   city: string,
   images: string[]
}

defineProps<{
   farmer: Farmer
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
   padding-right: 0;
}

.farmer-info {
   margin-left: 12px;
   margin-top: 5px;
}

.farmer-name {
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
   margin-bottom: 1px;
}

.farmer-city {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   color: var(--color-light);
   margin-bottom: 2.5px;
}

.farmer-time {
   font-weight: 400;
   font-size: 12px;
   line-height: 120%;
   color: var(--color-primary);
}

.farmer-offers {
   width: 64px;
   height: 64px;
   min-width: 64px;
   outline: 1px solid var(--color-primary);
   outline-offset: -3px;
   border-radius: 8px;
   margin-right: 5px;
}

.offers-title {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   text-align: center;
   color: var(--color-primary);
}

.divider {
   margin: 6px 0;
   width: calc(100% - 14px);
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
   margin-top: 13px;
}

.order-image-list-item {
   margin-right: 5px;
}

.order-image-list-item:last-child {
   margin-right: 11px;
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