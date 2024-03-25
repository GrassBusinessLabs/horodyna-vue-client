<template>
   <div :class="{ 'inactive-offer': !offer.status }" class='offer-card d-flex flex-column'>
      <div class="offer-image-block">
         <img width="128" :src="linkIMG + '/' + offer.image" alt="Product image"
            class="offer-image">
      </div>
      <div class="offer-info d-flex flex-column justify-space-between">
         <div>
            <div class="info-text d-flex justify-space-between align-center">
               <div class="offer-title">
                  {{ offer.title }}
               </div>
               <div class="offer-rating d-flex align-center">
                  <svg @click="offerHandler(offer)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M8.58699 8.236L11.185 3.004C11.2606 2.85259 11.3769 2.72523 11.5209 2.63622C11.6648 2.54721 11.8307 2.50006 12 2.50006C12.1692 2.50006 12.3351 2.54721 12.4791 2.63622C12.6231 2.72523 12.7394 2.85259 12.815 3.004L15.413 8.236L21.221 9.08C21.3885 9.10323 21.5461 9.17309 21.6759 9.28161C21.8056 9.39013 21.9022 9.53294 21.9546 9.69373C22.0071 9.85452 22.0133 10.0268 21.9725 10.191C21.9317 10.3551 21.8456 10.5045 21.724 10.622L17.522 14.692L18.514 20.442C18.641 21.18 17.861 21.742 17.194 21.394L12 18.678L6.80499 21.394C6.13899 21.743 5.35899 21.18 5.48599 20.441L6.47799 14.691L2.27599 10.621C2.15498 10.5034 2.06939 10.3542 2.02896 10.1903C1.98852 10.0265 1.99487 9.85457 2.04726 9.69415C2.09966 9.53373 2.19601 9.39122 2.32536 9.28284C2.45471 9.17445 2.61188 9.10452 2.77899 9.081L8.58699 8.236Z"
                        stroke="#529075" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p class="offer-rate-number">4.5</p>
                  <svg @click="offerHandler(offer)" class="ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M21.25 10.5C21.25 14.6705 17.2275 18.25 12 18.25C10.6665 18.25 9.40205 18.0134 8.26107 17.5896C7.94465 17.4721 7.60635 17.5041 7.36212 17.5468C7.09334 17.5938 6.80109 17.6805 6.51114 17.7812C5.98532 17.9639 5.37952 18.2242 4.80306 18.4718C4.74523 18.4967 4.68769 18.5214 4.63057 18.5459C3.98396 18.8232 3.38893 19.0728 2.91188 19.2193C2.85205 19.2377 2.7964 19.2537 2.74481 19.2675C2.87886 18.8884 3.10389 18.4105 3.35906 17.8798C3.37909 17.8381 3.3993 17.7961 3.41965 17.7539C3.66059 17.2534 3.91935 16.7159 4.09232 16.2572C4.18572 16.0096 4.26971 15.7454 4.3063 15.4972C4.33731 15.2869 4.36648 14.8922 4.11888 14.5556C3.24548 13.3682 2.74995 11.9794 2.74995 10.5C2.74995 6.32946 6.7724 2.75 12 2.75C17.2275 2.75 21.25 6.32946 21.25 10.5ZM2.314 19.3376C2.31413 19.3374 2.31693 19.3376 2.32198 19.3385C2.31639 19.3382 2.31387 19.3377 2.314 19.3376ZM2.63455 19.6992C2.6348 19.7029 2.63478 19.7049 2.63471 19.705C2.63464 19.7051 2.63451 19.7032 2.63455 19.6992Z"
                        stroke="#529075" stroke-width="1.5" />
                     <circle cx="9" cy="11" r="1" fill="#529075" />
                     <circle cx="12" cy="11" r="1" fill="#529075" />
                     <circle cx="15" cy="11" r="1" fill="#529075" />
                  </svg>
                  <p class="offer-rate-number">26</p>
               </div>
            </div>

            <div class="offer-description">
               {{ offer.description }}
            </div>
         </div>
         <div>
            <div class="divider"></div>
            <div class="info-price d-flex justify-space-between">
               <p class="offer-price"> {{ offer.price }}₴ за {{ translate(offer?.unit) }}</p>
               <div class="d-flex align-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <circle cx="10" cy="10" r="10" fill="#529075" />
                     <rect x="9.44446" y="5" width="1.11111" height="10" rx="0.555556" fill="white" />
                     <rect x="5" y="10.5556" width="1.11111" height="10" rx="0.555555" transform="rotate(-90 5 10.5556)"
                        fill="white" />
                  </svg>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { useRouting, useTranslate } from '@/composables'
import type { Offer, OrderById } from "@/models"
import { useCartStore, useFarmStore, useOrderStore } from '@/stores'

interface OrderInfo {
   hideIcons: boolean,
   order: OrderById
}

const props = defineProps<{
   offer: Offer,
   orderInfo?: OrderInfo,
   isHideSeller?: boolean
}>()

const farmStore = useFarmStore()
const { getFarmAddress } = farmStore

const orderStore = useOrderStore()
const { getProductAmount } = orderStore

const cartStore = useCartStore()
const { addProductToCart, removeProductFromCart } = cartStore

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const { translate } = useTranslate()

const routing = useRouting()

const showProductOnMap = (Offer: Offer) => {
   cartStore.setSelectedOffer(Offer)
   routing.toMap()
}

const farmAddress = (farmId: number) => {
   const foundAddress = getFarmAddress(farmId)
   const spliteedAddress = foundAddress?.address ? foundAddress?.address.split(",") : 'Farm not found'
   return (spliteedAddress[0] + "," + spliteedAddress[1]).replace("Вулиця", "")
}

const getOrderItemAmount = () => {
   const foundOrderItem = props.orderInfo?.order.order_items.find(item => item.offer.id === props.offer.id)
   return foundOrderItem?.amount
}

const emit = defineEmits<{
   (e: 'offerDetails', offer: Offer): void
}>()

function offerHandler(event: Offer): void {
   emit('offerDetails', event)
}
</script>

<style scoped>
.info-text {
   margin-bottom: 5px;
}

.offer-rating {
   margin-bottom: 5px;
}

.offer-card {
   margin: 19px 15px;
   margin-bottom: 30px;
   margin-left: 17.2px;
   width: 91.5%;
   aspect-ratio: 1 / 1;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   border-radius: 8px;
}

.offer-image-block {
   height: calc(100% - 140px);
   width: 100%;
}

.offer-info {
   height: 140px;
   width: 100%;
   padding: 15px 16px 12px 16px;
}

.offer-image {
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: 8px 8px 0 0;
}

.offer-title {
   font-family: var(--font-family);
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
}

.offer-price {
   font-family: var(--font-family);
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
}

.offer-description {
   font-family: var(--font-family);
   font-weight: 400;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-light);
}

.offer-rate-number {
   margin-left: 5px;
   margin-top: 3.1px;
   font-family: var(--font-family);
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-dark);
}

.offer-amount {
   font-family: var(--font-family);
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-dark);
   margin: 0 10px;
}

.info-price {
   margin-top: 8px;
}

.divider {
   margin-bottom: 9px;
}

.my-margin {
   margin-bottom: 2px;
}

.my-sub-margin {
   margin-bottom: 1px;
}

.v-list-item {
   padding-top: 14px;
   padding-bottom: 14px;
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

.product-counter {
   max-width: 23px;
   margin: 0 4px;
   line-height: 0.9;
}

.inactive-offer {
   opacity: 70%;
}

.inactive-title {
   width: 90px;
   font-size: 18px;
   opacity: 80%;
}

.no-seller {
   margin: 5px 0;
}

.offer-info-size {
   font-size: 14px;
}

.address-icon {
   margin-left: -3px;
}
</style>