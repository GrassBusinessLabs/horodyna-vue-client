<template>
   <v-col cols='auto'
          style="position: sticky; top: 0;"
          class='pa-2'
          v-if='filteredProducts.length !== 0'
   >
      <v-avatar
         color='primary'
         size="27"
         class='text-subtitle-2'
      >
         {{ letter }}
      </v-avatar>
   </v-col>

   <v-col
      cols='10'
      v-if='filteredProducts.length !== 0'
      :class='`${letter}`'
      class='pl-2'
   >

      <v-list :lines="'two'" class='mt-2'>
         <v-list-item
            v-for="product in filteredProducts"
            :key="product.id"
            :title="product.name"
            :subtitle="`Категорія: ${product.category}`"
            :prepend-avatar="product.img"
            @click='setCategory(product.name)'
            class='pa-0'
         >
            <v-divider :thickness="2" class='mt-2'></v-divider>
         </v-list-item>
      </v-list>

   </v-col>
</template>

<script lang='ts' setup>
import {useRouting} from '@/composables'

import {productsData} from '@/constants/products.ts'
import {useCategoryStore} from '@/stores'

const props = defineProps<{
   letter: string
}>()

const routing = useRouting()

const filteredProducts = productsData.filter((product) => props.letter === product.name[0])
   .sort((a, b) => a.name.localeCompare(b.name))

const categoryStore = useCategoryStore()
const {setCurrentCategory} = categoryStore

const setCategory = async (name: string) => {
   setCurrentCategory(name)
   await routing.toProducts()
}

</script>

<style lang='scss' scoped>
v-col {
   padding: 0;
}
</style>
