<template>
   <div :class="{ 'inactive-offer': !offer.status }" class='offer-card d-flex flex-column'>
      <div class="offer-image-block">
         <img @click="offerHandler(offer)" width="128" :src="linkIMG + '/' + offer.image" alt="Product image"
            class="offer-image">
      </div>
      <div class="offer-info d-flex flex-column justify-space-between">
         <div class="info-text d-flex justify-space-between">
            <div class="offer-title">
               {{ offer.title }}
            </div>
            <div class="offer-rating d-flex align-center">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M8.58699 8.236L11.185 3.004C11.2606 2.85259 11.3769 2.72523 11.5209 2.63622C11.6648 2.54721 11.8307 2.50006 12 2.50006C12.1692 2.50006 12.3351 2.54721 12.4791 2.63622C12.6231 2.72523 12.7394 2.85259 12.815 3.004L15.413 8.236L21.221 9.08C21.3885 9.10323 21.5461 9.17309 21.6759 9.28161C21.8056 9.39013 21.9022 9.53294 21.9546 9.69373C22.0071 9.85452 22.0133 10.0268 21.9725 10.191C21.9317 10.3551 21.8456 10.5045 21.724 10.622L17.522 14.692L18.514 20.442C18.641 21.18 17.861 21.742 17.194 21.394L12 18.678L6.80499 21.394C6.13899 21.743 5.35899 21.18 5.48599 20.441L6.47799 14.691L2.27599 10.621C2.15498 10.5034 2.06939 10.3542 2.02896 10.1903C1.98852 10.0265 1.99487 9.85457 2.04726 9.69415C2.09966 9.53373 2.19601 9.39122 2.32536 9.28284C2.45471 9.17445 2.61188 9.10452 2.77899 9.081L8.58699 8.236Z"
                     stroke="#529075" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
               </svg>
               <p class="offer-rate-number">4.5</p>
            </div>
         </div>
         <div class="offer-description">
            {{ offer.description }}
         </div>
         <v-divider></v-divider>
         <div class="info-price d-flex justify-space-between">
            <p class="offer-price"> {{ offer.price }}₴ за {{ translate(offer?.unit) }}</p>

            <svg @click="addProductToCart(offer)" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="10" cy="10" r="10" fill="#529075" />
               <rect x="9.44446" y="5" width="1.11111" height="10" rx="0.555556" fill="white" />
               <rect x="5" y="10.5556" width="1.11111" height="10" rx="0.555555" transform="rotate(-90 5 10.5556)"
                  fill="white" />
            </svg>
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
.offer-card {
   margin: 21px 20px;
   margin-bottom: 30px;
   width: 89.7%;
   aspect-ratio: 1 / 1;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   border-radius: 11px;
}

.offer-image-block {
   height: 62%;
   width: 100%;
}

.offer-info {
   height: 38%;
   width: 100%;
   padding: 18px 19px 14px 19px;
}

.offer-image {
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: 11px 11px 0 0;
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