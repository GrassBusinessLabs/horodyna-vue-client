<template>
   <v-col cols='12'>
      <v-card
         class='rounded-lg'
         elevation='3'
      >
         <v-img
            :src="product.img"
            height="200px"
            :cover='true'
         ></v-img>

         <v-card-title>
            {{ product.name }}
         </v-card-title>

         <v-card-subtitle class='text-subtitle-1'>
            Всі товари додаються в корзину
         </v-card-subtitle>

         <v-card-actions class='pa-4'>
            <v-row>
               <v-col cols='6'>
                  <v-btn
                     variant='elevated'
                     color="primary"
                     :block='true'
                     @click='() => count++'
                  >
                     Додати {{ count ? count : '' }}
                  </v-btn>
               </v-col>
               <v-col cols='6'>
                  <v-btn
                     variant='elevated'
                     color="deep-orange-darken-1"
                     :block='true'
                     @click='() => count !== 0 ? count-- : count '
                  >
                     Видалити
                  </v-btn>
               </v-col>
            </v-row>
         </v-card-actions>
      </v-card>
   </v-col>
</template>

<script lang='ts' setup>
import type {Product} from '@/models'
import {ref} from 'vue'

defineProps<{
   product: Product
}>()

const count = ref(0)

</script>

<style lang='scss' scoped>

</style>
