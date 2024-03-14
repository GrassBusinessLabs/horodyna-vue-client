<template>
   <div :class="{'inactive-offer': !offer.status}" class='pa-4 py-3 rounded-xl product-item d-flex justify-space-between align-center app-item-color'>
      <div class="d-flex justify-space-between align-center">
         <img @click="offerHandler(offer)" width="128" :src="linkIMG + '/' + offer.image" alt="Product image" :class="`product-image ${offer.status ? '' : 'gray-scale'}`">
         <div class="ml-3">
            <v-list-item-title class='offer-title my-color my-sub-margin'>
               {{ offer.title }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="!isHideSeller" @click='showProductOnMap(offer)' class='offer-info-size'>
               {{ offer.user.name }}
            </v-list-item-subtitle>
            <v-list-item-subtitle @click='showProductOnMap(offer)' class='offer-info-size' :class="{'no-seller': isHideSeller}">
               {{ farmAddress(offer.farm_id) }}
               <v-icon icon="mdi-map-marker" size='13' class='text-black my-margin address-icon'></v-icon>
            </v-list-item-subtitle>
            <v-list-item-title class='offer-title my-color my-height'>
               {{ offer.price }} грн за {{ translate(offer?.unit) }}
            </v-list-item-title>
         </div>
      </div>
      <div v-if="offer.status" class="d-flex align-center">
         <v-icon
            v-if="!orderInfo?.hideIcons" 
            class="text-grey-darken-1" 
            icon="mdi-minus-circle-outline" 
            size='30' 
            color='black'
            @click="removeProductFromCart(offer)"
         ></v-icon>
         <v-list-item-subtitle class='py-1 font-weight-bold text-center product-counter' :class="{'order-amount': orderInfo?.hideIcons}">
            {{ orderInfo?.hideIcons ? getOrderItemAmount() : getProductAmount(offer.id) }} 
            {{ !orderInfo?.hideIcons ? (getProductAmount(offer.id) ? translate(offer?.unit) : '') : (orderInfo?.hideIcons ? translate(offer?.unit) : '') }}
         </v-list-item-subtitle>
         <v-icon 
            v-if="!orderInfo?.hideIcons"
            class="text-grey-darken-1" 
            icon="mdi-plus-circle-outline" 
            size='30' 
            color='black'
            @click="addProductToCart(offer)"
         ></v-icon>
      </div>
      <div class="inactive-title text-center mr-1 font-weight-medium" v-else>Немає в наявності</div>
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
const {getFarmAddress} = farmStore

const orderStore = useOrderStore()
const {getProductAmount} = orderStore

const cartStore = useCartStore()
const {addProductToCart, removeProductFromCart} = cartStore

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
   width: 70px;
   height: 70px;
   object-fit: cover;
   border-radius: 13px;
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
   font-size: 16px;
}
</style>