<template>
   <products-layout>
      <v-row class='ma-0'>
         <app-product
            v-for='product in categoryProducts'
            :key='product.id'
            :product='product'
         />
      </v-row>
   </products-layout>
</template>

<script setup lang='ts'>

import ProductsLayout from '@/layouts/ProductsLayout.vue'
import {productsData} from '@/constants/products.ts'
import AppProduct from '@/components/AppProduct.vue'
import {useCategoryStore} from '@/stores'
import {computed} from 'vue'
import {Product} from '@/models'

const categoryStore = useCategoryStore()
const {getCurrentCategory} = categoryStore
const currentCategory = getCurrentCategory()

const categoryProducts = computed(() => {
   return productsData.filter((product: Product) => product.category === currentCategory.name)
})

</script>

<style scoped>

</style>