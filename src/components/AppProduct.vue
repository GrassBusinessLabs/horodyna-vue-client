<template>
   <v-list-item class='pa-4 bg-white rounded-xl product-item'>
      <template v-slot:prepend>
         <v-avatar size="80" :image="product.img"></v-avatar>
      </template>

      <v-list-item-title class='my-font-size my-color my-sub-margin'>
         {{ product.name }}
      </v-list-item-title>
      <v-list-item-subtitle
         class='text-subtitle-1 my-margin'
         @click='showProductOnMap(product)'
      >
         {{ product.author }}
      </v-list-item-subtitle>
      <v-list-item-subtitle
         class='text-subtitle-1'
         @click='showProductOnMap(product)'
      >
         {{ product.address }}
         <v-icon
            icon="mdi-map-marker"
            size='15'
            class='text-black my-margin'
         ></v-icon>
      </v-list-item-subtitle>
      <v-list-item-title class='text-subtitle-1 my-color my-height'>
         {{ product.price }} грн за кг
      </v-list-item-title>

      <template v-slot:append>
         <v-icon
            icon="mdi-minus-circle-outline"
            size='34'
            color='black'
            @click='cartStore.decreaseProductQuantity(product)'
         ></v-icon>
         <v-list-item-subtitle class='text-h6 mx-2 font-weight-bold'>
            {{ cartStore.getCurrentProductQuantity(product) ? `${cartStore.getCurrentProductQuantity(product)} кг` : 0 }}
         </v-list-item-subtitle>
         <v-icon
            icon="mdi-plus-circle-outline"
            size='34'
            color='black'
            @click='addProduct(product)'
         ></v-icon>
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
.my-margin {
   margin-bottom: 2px;
}

.my-sub-margin {
   margin-bottom: 3px;
}

.my-height {
   height: 18.5px;
}
</style>