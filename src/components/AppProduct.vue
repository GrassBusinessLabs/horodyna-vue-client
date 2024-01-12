<template>
   <div class='pa-4 pr-3 rounded-xl product-item app-item-color d-flex justify-space-between align-center'>
      <div class="d-flex justify-space-between align-center">
         <img width="128" :src="linkIMG + '/' + offer.image" alt="Product image" class="product-image">
         <div class="ml-4">
            <v-list-item-title class='my-font-size my-color my-sub-margin'>
               {{ offer.title }}
            </v-list-item-title>
            <v-list-item-subtitle @click='showProductOnMap(offer)' class='my-subtitle-fs my-margin'>
               {{ offer.user.name }}
            </v-list-item-subtitle>
            <v-list-item-subtitle @click='showProductOnMap(offer)' class='my-subtitle-fs'>
               {{ getFarmAddress(offer.farm_id) }}
               <v-icon icon="mdi-map-marker" size='15' class='text-black my-margin'></v-icon>
            </v-list-item-subtitle>
            <v-list-item-title class='my-subtitle-fs my-color my-height'>
               {{ offer.price }} грн за {{ translate(offer?.unit) }}
            </v-list-item-title>
         </div>
      </div>
      <div class="d-flex align-center">
         <v-icon 
            class="text-grey-darken-1" 
            icon="mdi-minus-circle-outline" 
            size='34' 
            color='black'
            @click="removeProductFromCart(offer)"
         ></v-icon>
         <v-list-item-subtitle class='my-font-size mx-2 font-weight-bold text-center'>
            {{ getProductAmount(offer.id) }} {{ getProductAmount(offer.id) ? translate(offer?.unit) : '' }}
         </v-list-item-subtitle>
         <v-icon 
            class="text-grey-darken-1" 
            icon="mdi-plus-circle-outline" 
            size='34' 
            color='black'
            @click="addProductToCart(offer)"
         ></v-icon>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { useRouting, useTranslate } from '@/composables'
import type { Offer } from "@/models"
import { useCartStore, useFarmStore, useOrderStore } from '@/stores'

defineProps<{
   offer: Offer
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
</script>

<style scoped>
.my-margin {
   margin-bottom: 2px;
}

.my-sub-margin {
   margin-bottom: 3px;
}

.v-list-item {
   padding-top: 14px;
   padding-bottom: 14px;
}

.product-image {
   width: 80px;
   height: 80px;
   object-fit: cover;
   border-radius: 100%;
}

.v-list-item-title {
   max-width: 120px;
   white-space: normal;
   line-height: 1.1;
}

.v-list-item-subtitle {
   max-width: 120px;
}
</style>