<template>
   <products-layout>
      <v-list v-if="filteredOffers?.length" class='pa-0 bg-transparent'>
         <app-product
            v-for='offer in filteredOffers'
            :key='offer.id'
            :offer='offer'
         />
      </v-list>
      <v-sheet v-else class='mx-auto pa-6 rounded-lg'>
         <v-list-item-title
            class='no-item-title text-center py-1'
         >
            Поки що немає жодного товару
         </v-list-item-title>
         <v-btn
            color='orange'
            class='text-white mt-5 w-100'
            @click='routing.toCatalog()'
            variant='flat'
         >
            Перейти в каталог
         </v-btn>
      </v-sheet>
   </products-layout>
</template>

<script setup lang='ts'>
import ProductsLayout from '@/layouts/ProductsLayout.vue'
import AppProduct from '@/components/AppProduct.vue'
import {useCategoryStore, useFarmStore, useOfferStore, useOrderStore} from '@/stores'
import { storeToRefs } from 'pinia'
import { Offer } from '@/models'
import { useRouting } from '@/composables'

const routing = useRouting()

const categoryStore = useCategoryStore()
const {getCurrentCategory} = categoryStore
const currentCategory = getCurrentCategory()

const offerStore = useOfferStore()
const {populateOffers} = offerStore
const {offers} = storeToRefs(offerStore)

populateOffers()

const filteredOffers = offers.value?.filter((offer: Offer) => offer.category === currentCategory)

const orderStore = useOrderStore()
const {populateOrders} = orderStore

populateOrders()

const farmStore = useFarmStore()
const {populateFarms} = farmStore

populateFarms()

</script>

<style scoped>
.no-item-title {
   font-size: 30px;
   white-space: normal;
}
</style>