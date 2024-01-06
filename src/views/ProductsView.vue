<template>
   <products-layout>
      <v-list class='pa-0 bg-transparent'>
         <app-product
            v-for='product in offers'
            :key='product.id'
            :product='product'
         />
      </v-list>
   </products-layout>
</template>

<script setup lang='ts'>
import ProductsLayout from '@/layouts/ProductsLayout.vue'
import AppProduct from '@/components/AppProduct.vue'
import {useOfferStore} from '@/stores'
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

</script>

<style scoped>
</style>