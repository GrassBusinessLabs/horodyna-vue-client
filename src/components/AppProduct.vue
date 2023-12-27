<template>
   <v-list-item class='pa-4 bg-white rounded-xl product-item'>
      <template v-slot:prepend>
         <v-avatar size="93" :image="product.img"></v-avatar>
      </template>

      <v-list-item-title class='my-font-size'>
         {{ product.name }}
         <v-icon
            icon="mdi-map-marker"
            size='27'
            class='text-grey-darken-3 mb-1'
            @click='showProductOnMap(product)'
         ></v-icon>
      </v-list-item-title>
      <v-list-item-subtitle class='text-subtitle-1 mt-1'>
         Продавець: {{ product.author }}
      </v-list-item-subtitle>
      <v-list-item-title class='my-color my-font-size my-margin'>
         Ціна: {{ product.price }}.00 грн
      </v-list-item-title>

      <template v-slot:append>
         <v-container class='pa-0 d-flex flex-column'>
            <v-icon
               icon="mdi-minus-circle-outline"
               size='29'
               class='text-grey-darken-2'
               @click='cartStore.decreaseProductQuantity(product)'
            ></v-icon>
            <v-list-item-subtitle
               class='product-counter py-3 font-weight-bold text-center text-grey-darken-5'
            >
               {{ cartStore.getCurrentProductQuantity(product) ? cartStore.getCurrentProductQuantity(product) : 0 }}
            </v-list-item-subtitle>
            <v-icon
               icon="mdi-plus-circle-outline"
               size='29'
               class='text-grey-darken-2'
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
.my-margin {
   margin-top: 9px;
}

.product-counter {
   font-size: 22px;
}
</style>