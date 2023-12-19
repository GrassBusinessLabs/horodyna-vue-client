<template>
   <v-col cols="12" class='py-0 pb-4'>
      <v-card class="rounded-lg mb-1" elevation="3">
         <v-img :src="product.img" height="200px" :cover="true"></v-img>

         <v-card-title>{{ product.name }}</v-card-title>

         <v-card-subtitle class="text-subtitle-1">
            Продавець: {{ product.author }}
         </v-card-subtitle>
         <v-card-subtitle class="text-subtitle-1">
            Ціна: {{ product.price }} грн за кг
         </v-card-subtitle>

         <v-card-actions class="pa-4">
            <v-row>
               <v-col cols="12" class='pt-1'>
                  <v-btn
                     variant="elevated"
                     color="primary"
                     @click="addToBasket"
                     class="btn-buy"
                  >
                     Купити
                  </v-btn>
               </v-col>
            </v-row>
         </v-card-actions>
      </v-card>
   </v-col>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Product } from "@/models";
import { productStore } from "@/stores/product-store.ts";

const props = defineProps<{
   product: Product;
}>();

const basketStore = productStore();
const sheet = ref(false);

const addToBasket = () => {
   const existingProduct = basketStore.basket.find(
      (item) => item.name === props.product.name
   );

   if (existingProduct) {
      existingProduct.selectedQuantity += 1;
      existingProduct.sum = existingProduct.selectedQuantity * existingProduct.price;
   } else {
      basketStore.basket.push({
         name: props.product.name,
         category: props.product.category,
         img: props.product.img,
         price: props.product.price,
         author: props.product.author,
         selectedQuantity: 1,
         sum: props.product.price,
      });
   }

   sheet.value = true;
};

let updateQuantity: (item: any, change: number) => void;
updateQuantity = function(item, change) {
   item.selectedQuantity += change;

   if (item.selectedQuantity < 1) {
      item.selectedQuantity = 1;
   }

   item.sum = item.selectedQuantity * item.price;
};
</script>

<style scoped>
.btn-buy {
   margin: 10px 0 5px 0;
   width: 100%;
}
</style>
