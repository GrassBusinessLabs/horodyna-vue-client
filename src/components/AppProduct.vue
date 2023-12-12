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
      Продавець: {{ product.author }}
   </v-card-subtitle>
   <v-card-subtitle class='text-subtitle-1'>
      Ціна: {{ product.price }} грн за кг
   </v-card-subtitle>

   <v-card-actions class='pa-4'>
      <v-row>
         <v-col cols='6'>
            <v-btn
               variant='elevated'
               color="primary"
               :block='true'
               @click='addInShop()'
            >
               Додати {{ count ? count + ' кг' : '' }}
            </v-btn>
         </v-col>
         <v-col cols='6'>
            <v-btn
               variant='elevated'
               color="deep-orange-darken-1"
               :block='true'
               @click='() => count !== 0 ? count-- : count'
            >
               Видалити
            </v-btn>
         </v-col>
      </v-row>
   </v-card-actions>
</v-card>
</v-col>
<v-footer>
<v-bottom-sheet v-model="sheet">
   <v-card height='500'>
      <v-card-text>
         <h3 class='text-center'>Кошик </h3>
         <div v-for="item in basketStore.basket" :key="item.name" >
            <div class='itemBasket'>
               <div class='image d-flex'>
                  <img :src='item.img' alt='Image' width='80'  >
               </div>

               <div>
                  <h3>{{item.name}}</h3>
                  <small>{{item.category}}</small>
                  <h5>К-сть : <i>{{item.count}}</i> кг</h5>
                  <h5>Продавець: <i>{{item.author}}</i></h5>
                  <h4>Ціна: {{item.price}} грн за кг</h4>
               </div>
            </div>
         </div>

         <h2 class= "text-center"> Сума до сплати: {{ calculateTotalSum() }} грн</h2>
         <div class = "d-flex align-center flex-column justify-center" >


            <v-btn @click='submitOrder' class='btn-access-shop' color='teal-accent-3'>
               Оформити замовлення
            </v-btn>
            <v-btn @click='sheet = !sheet' class='btn-continue-shop' color='lime-accent-2'>
               Продовжити покупки
            </v-btn>
         </div>
      </v-card-text>
   </v-card>
</v-bottom-sheet>
</v-footer>
</template>

<script lang='ts' setup>
import type { Product } from '@/models'
import { reactive, ref } from 'vue'
import { VBottomSheet } from 'vuetify/components/VBottomSheet'
import { productStore } from '@/stores/product-store.ts'

const props = defineProps<{
   product: Product
}>()
const basketStore = productStore()
const count = ref(1)
const sheet = ref(false)

const addInShop = () => {
   const existingProduct = basketStore.basket.find(item => item.name === props.product.name);

   if (existingProduct) {
      existingProduct.count += count.value;
      existingProduct.sum += count.value * props.product.price;
   } else {
      let data = reactive({
         name: props.product.name,
         category: props.product.category,
         img: props.product.img,
         price: props.product.price,
         author: props.product.author,
         count: count.value,
         sum: count.value * props.product.price
      });

      basketStore.basket.push(data);
   }

   count.value = 0; // Скидання лічильника після додавання в кошик
   sheet.value = true;
};

const calculateTotalSum = () => {
   return basketStore.basket.reduce((total, item) => total + item.sum, 0);
};

const submitOrder = () => {
   // Додайте код для оформлення замовлення
};
</script>


<style scoped>
.description{
   padding: 0 10px;
}

.itemBasket{
   margin: 10px 10px;
   display: flex;
   outline: 1px palegreen ridge;
   border-radius: 30px;
   padding: 10px 30px;
   width: 100%;
   justify-content: space-between;
}
img{
   border-radius:60px;
   width: 100px;
   height: 100px;
   padding: 10px;
}
.image{
   display:flex;
   align-items: center;
}
.btn-access-shop, .btn-continue-shop{
   margin: 10px 0 5px 0;
   width: 85%;
}


</style>