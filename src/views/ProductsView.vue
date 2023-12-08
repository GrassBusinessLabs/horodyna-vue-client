<template>
   <products-layout>
      <v-row class='ma-0' >
         <app-product
            v-for='product in filteredProducts'
            :key='product.id'
            :product='product'
         />
      </v-row>
   </products-layout>
</template>

<script setup lang='ts'>

import ProductsLayout from '@/layouts/ProductsLayout.vue'
import AppProduct from '@/components/AppProduct.vue'
import {useCategoryStore} from '@/stores'
import {Product} from '@/models'
import {categoryProducts} from '@/constants/categoryProducts.ts'

const categoryStore = useCategoryStore()
const {getCurrentCategory} = categoryStore
const currentCategory = getCurrentCategory()

const filteredProducts = categoryProducts.filter((product: Product) => product.category === currentCategory)

</script>

<style scoped>

</style>