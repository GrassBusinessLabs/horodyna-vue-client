<template>
   <v-col
      cols='12'
      v-if='showFilter'
   >
      <v-card
         class='rounded-lg bg-grey-lighten-4'
         elevation='3'
      >
         <v-row>
            <v-col cols='auto'>
               <v-card-actions>
                  <v-btn
                     color='primary'
                     density="comfortable"
                     :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                     class='font-weight-bold'
                  >
                     {{ letter }}
                  </v-btn>
               </v-card-actions>
            </v-col>
            <v-col cols='7'>
               <v-card-title>
                  Продуктів {{ filteredProducts.length === 0 ? ' немає' : filteredProducts.length }}
               </v-card-title>
            </v-col>
            <v-col cols='auto'>
               <v-card-actions>
                  <v-btn
                     density="comfortable"
                     :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                     @click='() => show = !show'
                     v-if='filteredProducts.length !== 0'
                  ></v-btn>
               </v-card-actions>
            </v-col>
         </v-row>
         <v-expand-transition>
            <div v-show="show">
               <v-divider></v-divider>
               <v-card
                  variant='flat'
                  class="mx-auto"
                  :title="product.name"
                  v-for='product in filteredProducts'
                  :key='product.id'
                  @click='setCategory(product.name)'
               >
                  <template v-slot:prepend>
                     <v-icon class='ml-1' color='grey' size='10'>
                        mdi-circle
                     </v-icon>
                     <v-avatar class='ml-15 border bg-blue-grey-darken-3' size="40">
                        <v-img
                           :src="product.img"
                           alt="Product image"
                           :cover='true'
                        ></v-img>
                     </v-avatar>
                  </template>
               </v-card>
            </div>
         </v-expand-transition>
      </v-card>
   </v-col>
</template>

<script lang='ts' setup>
import type {Product} from '@/models'
import {useRouting} from '@/composables'

import {computed, ref} from 'vue'
import {productsData} from '@/constants/products.ts'
import {useCategoryStore} from '@/stores'

const props = defineProps<{
   letter: string
   filter: string
}>()

const routing = useRouting()

const show = ref(false)

const filteredProducts = productsData.filter((product: Product) => props.letter === product.name[0])
   .sort((a, b) => a.name.localeCompare(b.name))

const categoryStore = useCategoryStore()
const {setCurrentCategory} = categoryStore

const setCategory = async (name: string) => {
   setCurrentCategory(name)
   await routing.toProducts()
}

const showFilter = computed(() => {
   switch (props.filter) {
      case 'filled':
         return filteredProducts.length !== 0
      case 'empty':
         return filteredProducts.length === 0
      case 'all':
      default:
         return true
   }
})

</script>

<style lang='scss' scoped>

</style>
