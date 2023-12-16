<template>
   <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
   <v-col cols="12" class='py-0 pb-1'>
      <v-btn icon @click="() => sheet = false" class="back-btn">
         <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

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

      <v-footer>
         <v-bottom-sheet v-model="sheet" :fullscreen="true">
            <v-card height="500">
               <v-btn icon @click="() => sheet = false" class="back-btn">
                  <v-icon>mdi-chevron-left</v-icon>
               </v-btn>

               <v-card-text>
                  <h3 class="text-center">Кошик </h3>
                  <div v-for="item in basketStore.basket" :key="item.name" class= 'main-basket d-flex flex-column' >
                     <div class="itemBasket">
                        <div class="image d-flex">
                           <img :src="item.img" alt="Image" width="80">
                        </div>
                        <div>
                           <h3>{{ item.name }}</h3>
                           <small>{{ item.category }}</small>
                           <h5>К-сть : <i>{{ item.selectedQuantity }} кг</i></h5>
                           <h5>Продавець: <i>{{ item.author }}</i></h5> <br>
                        </div>

                        <div class="quantity-buttons">
                           <v-btn @click="removeFromBasket(item)" color="red" dark icon = "mdi-trash-can" class= "btn-basket">
                           </v-btn>
                           <v-btn @click="updateQuantity(item, 1)" class= "btn-basket">+</v-btn>
                           <v-btn @click="updateQuantity(item, -1)" class= "btn-basket">-</v-btn>
                        </div>
                     </div>
                     <div class='btn-ptice'>
                        <h4 class='text-center'>Ціна: {{ item.price }} грн за кг</h4>
                     </div>
                  </div>

                  <h2 class="text-center">
                     Сума до сплати: {{ calculateTotalSum() }} грн
                  </h2>
                  <div class="d-flex align-center flex-column justify-center">
                     <v-btn @click="submitOrder" class="btn-access-shop" color="#3477eb">
                        Оформити замовлення
                     </v-btn>
                  </div>
               </v-card-text>
            </v-card>
         </v-bottom-sheet>
      </v-footer>
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

const calculateTotalSum = () => {
   return basketStore.basket.reduce(function (total, item) {
      if (!(item.sum !== undefined && item.sum !== null)) {
         return total;
      } else {
         return total + item.sum;
      }
   }, 0);
};

const submitOrder = () => {
   // Додайте код для оформлення замовлення
};

const removeFromBasket = (product: Product) => {
   const index = basketStore.basket.indexOf(product);
   if (index !== -1) {
      basketStore.basket.splice(index, 1);
   }
};
</script>

<style scoped>
.back-btn {
   position: absolute;
   top: 10px;
   left: 10px;
   z-index: 2;
}

.btn-buy {
   margin: 10px 0 5px 0;
   width: 100%;
}

.itemBasket {

   display: flex;
   width: 100%;
   justify-content: space-between;
}

img {
   border-radius: 60px;
   width: 80px;
   height: 80px;
   padding: 15px;
}

.image {
   display: flex;
   align-items: center;
}

.quantity-buttons {
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   margin-right: 10px;
}

.btn-access-shop {
   margin: 10px 0 5px 0;
   width: 90%;
}
.quantity-buttons{
   display:flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
}
.btn-basket{
   border-radius: 60px;
   height: 50px;
   width: 50px;
}
.btn-ptice{
   display: flex;

}
.main-basket{
   margin: 10px 10px;
   outline: 1px palegreen ridge;
   border-radius: 30px;
   padding: 10px 30px;
}
.btn-ptice{
   display: flex;
   justify-content: center;

}
</style>
