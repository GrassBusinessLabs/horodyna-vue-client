<template>
   <div @click='detailsHandler(order)' class="order-block">
      <div class="top-block d-flex">
         <img class="comment-avatar" alt="Product image"
            src="https://companynewheroes.com/wp-content/blogs.dir/18/files/2019/09/Lucas-De-Man-Fotograaf-Anne-Harbers-2-1024x683.jpg">
         <div class="order-text-block">
            <p class="comment-author">Іван Микитенко</p>
            <div>
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M7.15587 6.86333L9.32087 2.50333C9.38389 2.37715 9.48082 2.27102 9.60078 2.19684C9.72074 2.12267 9.85899 2.08337 10 2.08337C10.1411 2.08337 10.2793 2.12267 10.3993 2.19684C10.5193 2.27102 10.6162 2.37715 10.6792 2.50333L12.8442 6.86333L17.6842 7.56666C17.8238 7.58602 17.9552 7.64423 18.0633 7.73467C18.1714 7.8251 18.2519 7.9441 18.2956 8.0781C18.3393 8.21209 18.3444 8.35567 18.3104 8.49245C18.2765 8.62923 18.2047 8.75371 18.1034 8.85166L14.6017 12.2433L15.4284 17.035C15.5342 17.65 14.8842 18.1183 14.3284 17.8283L10 15.565L5.67087 17.8283C5.11587 18.1192 4.46587 17.65 4.5717 17.0342L5.39837 12.2425L1.8967 8.85083C1.79586 8.7528 1.72453 8.62846 1.69084 8.49192C1.65714 8.35538 1.66243 8.21213 1.70609 8.07845C1.74976 7.94476 1.83005 7.82601 1.93784 7.73569C2.04564 7.64536 2.17661 7.58709 2.31587 7.56749L7.15587 6.86333Z"
                     fill="#529075" stroke="#529075" stroke-width="1.25357" stroke-linecap="round"
                     stroke-linejoin="round" />
               </svg>
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M7.15587 6.86333L9.32087 2.50333C9.38389 2.37715 9.48082 2.27102 9.60078 2.19684C9.72074 2.12267 9.85899 2.08337 10 2.08337C10.1411 2.08337 10.2793 2.12267 10.3993 2.19684C10.5193 2.27102 10.6162 2.37715 10.6792 2.50333L12.8442 6.86333L17.6842 7.56666C17.8238 7.58602 17.9552 7.64423 18.0633 7.73467C18.1714 7.8251 18.2519 7.9441 18.2956 8.0781C18.3393 8.21209 18.3444 8.35567 18.3104 8.49245C18.2765 8.62923 18.2047 8.75371 18.1034 8.85166L14.6017 12.2433L15.4284 17.035C15.5342 17.65 14.8842 18.1183 14.3284 17.8283L10 15.565L5.67087 17.8283C5.11587 18.1192 4.46587 17.65 4.5717 17.0342L5.39837 12.2425L1.8967 8.85083C1.79586 8.7528 1.72453 8.62846 1.69084 8.49192C1.65714 8.35538 1.66243 8.21213 1.70609 8.07845C1.74976 7.94476 1.83005 7.82601 1.93784 7.73569C2.04564 7.64536 2.17661 7.58709 2.31587 7.56749L7.15587 6.86333Z"
                     fill="#529075" stroke="#529075" stroke-width="1.25357" stroke-linecap="round"
                     stroke-linejoin="round" />
               </svg>
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M7.15587 6.86333L9.32087 2.50333C9.38389 2.37715 9.48082 2.27102 9.60078 2.19684C9.72074 2.12267 9.85899 2.08337 10 2.08337C10.1411 2.08337 10.2793 2.12267 10.3993 2.19684C10.5193 2.27102 10.6162 2.37715 10.6792 2.50333L12.8442 6.86333L17.6842 7.56666C17.8238 7.58602 17.9552 7.64423 18.0633 7.73467C18.1714 7.8251 18.2519 7.9441 18.2956 8.0781C18.3393 8.21209 18.3444 8.35567 18.3104 8.49245C18.2765 8.62923 18.2047 8.75371 18.1034 8.85166L14.6017 12.2433L15.4284 17.035C15.5342 17.65 14.8842 18.1183 14.3284 17.8283L10 15.565L5.67087 17.8283C5.11587 18.1192 4.46587 17.65 4.5717 17.0342L5.39837 12.2425L1.8967 8.85083C1.79586 8.7528 1.72453 8.62846 1.69084 8.49192C1.65714 8.35538 1.66243 8.21213 1.70609 8.07845C1.74976 7.94476 1.83005 7.82601 1.93784 7.73569C2.04564 7.64536 2.17661 7.58709 2.31587 7.56749L7.15587 6.86333Z"
                     fill="#529075" stroke="#529075" stroke-width="1.25357" stroke-linecap="round"
                     stroke-linejoin="round" />
               </svg>
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M7.15587 6.86333L9.32087 2.50333C9.38389 2.37715 9.48082 2.27102 9.60078 2.19684C9.72074 2.12267 9.85899 2.08337 10 2.08337C10.1411 2.08337 10.2793 2.12267 10.3993 2.19684C10.5193 2.27102 10.6162 2.37715 10.6792 2.50333L12.8442 6.86333L17.6842 7.56666C17.8238 7.58602 17.9552 7.64423 18.0633 7.73467C18.1714 7.8251 18.2519 7.9441 18.2956 8.0781C18.3393 8.21209 18.3444 8.35567 18.3104 8.49245C18.2765 8.62923 18.2047 8.75371 18.1034 8.85166L14.6017 12.2433L15.4284 17.035C15.5342 17.65 14.8842 18.1183 14.3284 17.8283L10 15.565L5.67087 17.8283C5.11587 18.1192 4.46587 17.65 4.5717 17.0342L5.39837 12.2425L1.8967 8.85083C1.79586 8.7528 1.72453 8.62846 1.69084 8.49192C1.65714 8.35538 1.66243 8.21213 1.70609 8.07845C1.74976 7.94476 1.83005 7.82601 1.93784 7.73569C2.04564 7.64536 2.17661 7.58709 2.31587 7.56749L7.15587 6.86333Z"
                     fill="#529075" stroke="#529075" stroke-width="1.25357" stroke-linecap="round"
                     stroke-linejoin="round" />
               </svg>
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M7.15587 6.86333L9.32087 2.50333C9.38389 2.37715 9.48082 2.27102 9.60078 2.19684C9.72074 2.12267 9.85899 2.08337 10 2.08337C10.1411 2.08337 10.2793 2.12267 10.3993 2.19684C10.5193 2.27102 10.6162 2.37715 10.6792 2.50333L12.8442 6.86333L17.6842 7.56666C17.8238 7.58602 17.9552 7.64423 18.0633 7.73467C18.1714 7.8251 18.2519 7.9441 18.2956 8.0781C18.3393 8.21209 18.3444 8.35567 18.3104 8.49245C18.2765 8.62923 18.2047 8.75371 18.1034 8.85166L14.6017 12.2433L15.4284 17.035C15.5342 17.65 14.8842 18.1183 14.3284 17.8283L10 15.565L5.67087 17.8283C5.11587 18.1192 4.46587 17.65 4.5717 17.0342L5.39837 12.2425L1.8967 8.85083C1.79586 8.7528 1.72453 8.62846 1.69084 8.49192C1.65714 8.35538 1.66243 8.21213 1.70609 8.07845C1.74976 7.94476 1.83005 7.82601 1.93784 7.73569C2.04564 7.64536 2.17661 7.58709 2.31587 7.56749L7.15587 6.86333Z"
                     stroke="#999999" stroke-width="1.25357" stroke-linecap="round" stroke-linejoin="round" />
               </svg>
            </div>
            <p class='comment-date'>25.05.2024</p>
         </div>
      </div>
      <p class="comment-text">Страва дуже сподобалась, але коли жінка запитала чи смачніше ніж у неї, я просто не зміг
         поставити 5 бо вона дивилась.</p>
   </div>
</template>

<script setup lang='ts'>
import { Order } from '@/models'
import { useFarmStore } from '@/stores'
import { ref } from 'vue'

// const props = defineProps<{
//    order: OrderById,
//    relatedOffers: Offer[]
// }>()

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

const date = ref('')

// onMounted(() => {
//    const isoDate = new Date(props.order.created_data)
//    const day = isoDate.getDate().toString().padStart(2, '0')
//    const month = (isoDate.getMonth() + 1).toString().padStart(2, '0')
//    const year = isoDate.getFullYear()
//    const hours = isoDate.getHours().toString().padStart(2, '0')
//    const minutes = isoDate.getMinutes().toString().padStart(2, '0')
//    date.value = `${day}.${month}.${year}, ${hours}:${minutes}`
// })
</script>

<style scoped>
svg {
   margin-right: 4px;
}

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
   width: calc(100% - 58px);
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   border-radius: 8px;
   background-color: white;
   padding: 14px;
   padding-bottom: 12px;
}

.order-block:first-child{
   margin-top: 18px;
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

.comment-author {
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
   margin-top: 5px;
   margin-bottom: 1px;
}

.comment-text {
   font-weight: 400;
   font-size: 16px;
   line-height: 150%;
   color: var(--color-dark);
   margin-top: 10px;
}

.order-date {
   font-weight: 400;
   font-size: 14px;
   line-height: 120%;
   color: var(--color-dark);
   margin-bottom: 3px;
}

.comment-date {
   font-weight: 400;
   font-size: 12px;
   line-height: 120%;
   color: var(--color-light);
   margin-top: -2.5px;
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

.comment-avatar {
   width: 64px;
   max-width: 64px;
   height: 64px;
   max-height: 64px;
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