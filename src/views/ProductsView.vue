<template>
   <products-layout>
      <v-list class='pa-0 bg-transparent'>
         <app-product
            v-for='product in filteredProducts'
            :key='product.id'
            :product='product'
         />
      </v-list>
   </products-layout>
</template>
<!--go-->
<script setup lang='ts'>

import ProductsLayout from '@/layouts/ProductsLayout.vue'
import AppProduct from '@/components/AppProduct.vue'
import {useCategoryStore} from '@/stores'
import {categoryProducts} from '@/constants/categoryProducts.ts'

const categoryStore = useCategoryStore()
const {getCurrentCategory} = categoryStore
const currentCategory = getCurrentCategory()

const filteredProducts = categoryProducts.filter((product) => product.category === currentCategory)

</script>

<style scoped>

</style>