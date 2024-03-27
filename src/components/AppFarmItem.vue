<template>
   <div class='cart-item d-flex align-center'>
      <img @click="offerHandler(offer)" width="128" :src="linkIMG + '/' + offer.image" alt="Product image"
         :class="`product-image ${offer.status ? '' : 'gray-scale'}`">

      <div class="cart-item-info d-flex flex-column justify-space-between">
         <div>
            <div class="info-text d-flex justify-space-between">
            <div class="offer-title">
               {{ offer.title }}
            </div>
         </div>
         <div class="cart-item-description">
            {{ offer.description }}
         </div>
         </div>
         
         <div class="bottom-block d-flex justify-space-between">
            <p class="cart-item-price"> {{ offer.price }}₴/{{ translate(offer?.unit) }}</p>
            <div class="d-flex align-center">
               <svg @click="removeProductFromCart(offer)" width="20" height="20" viewBox="0 0 20 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#529075" />
                  <rect x="5" y="10.5555" width="1.11111" height="10" rx="0.555555" transform="rotate(-90 5 10.5555)"
                     fill="white" />
               </svg>
               <p class="cart-item-amount">{{ getProductAmount(offer.id) }}</p>
               <svg @click="addProductToCart(offer)" width="20" height="20" viewBox="0 0 20 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#529075" />
                  <rect x="9.44446" y="5" width="1.11111" height="10" rx="0.555556" fill="white" />
                  <rect x="5" y="10.5556" width="1.11111" height="10" rx="0.555555" transform="rotate(-90 5 10.5556)"
                     fill="white" />
               </svg>
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
.bottom-block {
   margin-bottom: 10px;
}

.info-text {
   margin-top: 12px;
}

.cart-item {
   margin: 19px 15px;
   margin-bottom: 21px;
   margin-left: 17.2px;
   width: 91.5%;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   border-radius: 8px;
   background-color: white;
   height: 100px;
}

.cart-item-info {
   height: 100px;
   width: 100%;
   padding: 0 14px;
}

.cart-item-title {
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-dark);
}

.cart-item-price {
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   text-align: center;
   color: var(--color-dark);
}

.cart-item-description {
   font-family: var(--font-family);
   font-weight: 400;
   font-size: 12px;
   line-height: 120%;
   color: var(--color-light);
}

.cart-item-amount {
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-dark);
   margin: 0 10px;
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

.product-image {
   width: 100px;
   height: 100px;
   object-fit: cover;
   border-radius: 8px 0 0 8px;
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

.product-item {
   padding-right: 10px !important;
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

.offer-title {
   font-weight: 600;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-dark);
   margin-bottom: 2px;
}
</style>