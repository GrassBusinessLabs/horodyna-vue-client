<template>
   <products-layout>
      <v-list class='pa-0 bg-transparent'>
         <app-product
            v-for='offer in offers'
            :key='offer.id'
            :offer='offer'
         />
      </v-list>
   </products-layout>
</template>

<script setup lang='ts'>
import ProductsLayout from '@/layouts/ProductsLayout.vue'
import AppProduct from '@/components/AppProduct.vue'
import {useFarmStore, useOfferStore, useOrderStore} from '@/stores'
// import {categoryProducts} from '@/constants/categoryProducts.ts'
import { storeToRefs } from 'pinia'

// const categoryStore = useCategoryStore()
// const {getCurrentCategory} = categoryStore
// const currentCategory = getCurrentCategory()

// const filteredProducts = categoryProducts.filter((product) => product.category === currentCategory)

const offerStore = useOfferStore()
const {populateOffers} = offerStore
const {offers} = storeToRefs(offerStore)

populateOffers()

// const orderStore = useOrderStore()
// const {populateOrders} = orderStore

// populateOrders()

const farmStore = useFarmStore()
const {populateFarms} = farmStore

populateFarms()

</script>

<style scoped>
</style>