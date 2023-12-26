<template>
   <v-list-item class='pa-4 bg-white rounded-xl product-item'>
      <template v-slot:prepend>
         <v-avatar size="95" :image="product.img"></v-avatar>
      </template>

      <v-list-item-title class='my-font-size'>
         {{ product.name }}
      </v-list-item-title>
      <v-list-item-subtitle class='text-subtitle-1 pt-2'>
         Продавець: {{ product.author }}
      </v-list-item-subtitle>
      <v-list-item-subtitle
         class='text-subtitle-1 py-2'
         @click='showProductOnMap(product)'
      >
         Адреса: {{ product.address }}
      </v-list-item-subtitle>
      <v-list-item-title class='my-color my-font-size'>
         Ціна: {{ product.price }}.00 грн
      </v-list-item-title>

      <template v-slot:append>
         <v-container class='pa-0 d-flex flex-column'>
            <v-icon
               icon="mdi-minus-circle-outline"
               size='32'
               class='text-grey-darken-1'
               @click='cartStore.decreaseProductQuantity(product)'
            ></v-icon>
            <v-list-item-subtitle
               class='my-item-subtitle py-4 font-weight-bold text-center text-grey-darken-4'
            >
               {{ cartStore.getCurrentProductQuantity(product) ? cartStore.getCurrentProductQuantity(product) : 0 }}
            </v-list-item-subtitle>
            <v-icon
               icon="mdi-plus-circle-outline"
               size='32'
               class='text-grey-darken-1'
               @click='addProduct(product)'
            ></v-icon>
         </v-container>
      </template>
   </v-list-item>
</template>

<script lang="ts" setup>
import type { Product } from "@/models";
import { productStore } from "@/stores/product-store.ts";
import {useRouting} from '@/composables'

defineProps<{
   product: Product;
}>();

const routing = useRouting()

const cartStore = productStore();

const addProduct = (product: Product) => {
   cartStore.addProductToCart({
      ...product,
      selectedQuantity: 1,
      sum: product.price
   })
}

const showProductOnMap = (product: Product) => {
   cartStore.setSelectedProduct(product)
   routing.toMap()
}
</script>

<style scoped>
</style>