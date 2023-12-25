<template>
   <v-col cols="12" class='py-0 pb-4'>
      <v-card class="rounded-lg mb-1" elevation="3">
         <v-img :src="props.product.img" height="200px" :cover="true"></v-img>

         <v-card-title>{{ props.product.name }}</v-card-title>

         <v-card-subtitle class="text-subtitle-1">
            Продавець: {{ props.product.author }}
         </v-card-subtitle>
         <v-card-subtitle class="text-subtitle-1">
            Ціна: {{ props.product.price }} грн за кг
         </v-card-subtitle>

         <v-card-actions class="pa-4 d-flex justify-space-between ">
            <div  class='d-flex justify-center align-center'>
            <v-row class="v-row">
               <v-col cols="4" class="text-center">
                  <div>
                     <v-btn
                        variant="elevated"
                        color="primary"
                        @click="updateQuantity(props.product, -1)"
                        class="btn-basket"
                     >
                        <v-icon>mdi-minus</v-icon>
                     </v-btn>
                  </div>
               </v-col>
               <v-col cols="4" class="text-center">
                  <div class="quantity-display" @click="updateQuantity(props.product, -1)">
                     <span></span>
                     {{ quantityDisplay }}
                  </div>
               </v-col>
               <v-col cols="4" class="">
                  <div>
                     <v-btn
                        variant="elevated"
                        color="primary"
                        @click="updateQuantity(props.product, 1)"
                        class="btn-basket"
                     >
                        <v-icon>mdi-plus</v-icon>
                     </v-btn>
                  </div>
               </v-col>
            </v-row>
            </div>
            <div class="btn-buy2">
<!--               <v-row>-->
<!--                     <v-col cols="12" class="pt-2 text-center">-->
                        <v-btn
                           variant="elevated"
                           color="primary"
                           @click="addToBasket"
                           class="btn-buy"
                        >
                           <v-icon left>mdi-cart</v-icon> Купити
                        </v-btn>
<!--                     </v-col>-->
<!--               </v-row>-->
            </div>
         </v-card-actions>
      </v-card>
   </v-col>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import type { Product } from "@/models";
import { productStore } from "@/stores/product-store.ts";

const props = defineProps<{
   product: Product & { selectedQuantity: number };
}>();

const basketStore = productStore();
const quantityDisplay = ref(props.product.selectedQuantity);

const addToBasket = () => {
   const existingProduct: any = basketStore.basket.find(
      (item: any) => item.name === props.product.name
   );

   if (existingProduct) {
      existingProduct.selectedQuantity += props.product.selectedQuantity;
      existingProduct.sum = existingProduct.selectedQuantity * existingProduct.price;
   } else {
      basketStore.basket.push({
         name: props.product.name,
         img: props.product.img,
         price: props.product.price,
         author: props.product.author,
         selectedQuantity: props.product.selectedQuantity,
         sum: props.product.selectedQuantity * props.product.price,
      });
   }

   quantityDisplay.value = props.product.selectedQuantity;
};

const updateQuantity = (item: any, change: number) => {
   const newQuantity = item.selectedQuantity + change;

   if (newQuantity < 1 || isNaN(newQuantity)) {
      item.selectedQuantity = 1;
   } else {
      item.selectedQuantity = newQuantity;
   }

   item.sum = item.selectedQuantity * item.price;

   quantityDisplay.value = item.selectedQuantity;
};
</script>

<style scoped>
.btn-buy {
   width: 100%;
}

.quantity-display {
   justify-content: space-between;
   align-items: center;
   font-size: 20px;
   font-weight: bold;
   height: 50%;
   cursor: pointer;
}

.quantity-display span {
   margin: 0 2px;
}


.btn-buy2 {
padding-top: 10px;
   width: 150px;
}
.v-row {
   display: flex;
padding-top: 10px;
   justify-content: center;
}
</style>