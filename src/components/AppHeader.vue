<template>
   <v-navigation-drawer
      v-model='drawer'
      :temporary='true'
      class='position-fixed'
   >
      <v-list-item
         prepend-avatar='https://randomuser.me/api/portraits/men/78.jpg'
         class='my-padding'
      >
         <v-list-item-title class='text-h6'>User Name</v-list-item-title>
         <v-list-item-subtitle class='text-subtitle-1'>sa@test.com</v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density='compact' :nav='true'>
         <v-list-item @click='routing.toSettings'>
            <template v-slot:prepend>
               <v-icon icon='mdi mdi-cog'></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Налаштування</v-list-item-title>
            </template>
         </v-list-item>
         <v-list-item @click='routing.toSettings'>
            <template v-slot:prepend>
               <v-icon icon='mdi-face-agent'></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Підтримка</v-list-item-title>
            </template>
         </v-list-item>
         <v-list-item @click='routing.toAbout'>
            <template v-slot:prepend>
               <v-icon icon='mdi-information-outline'></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Про сайт</v-list-item-title>
            </template>
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
   <v-app-bar class='position-fixed' color='primary'>
      <template v-slot:prepend>
         <v-container class='d-flex'>
            <v-btn
               v-if="route.path !== '/sign-in'"
               class='pa-0 w-auto h-auto mr-4'
               icon='mdi mdi-menu'
               @click.stop='drawer = !drawer'
            >
            </v-btn>
            <v-app-bar-title>{{ headerTitle }}</v-app-bar-title>
         </v-container>
      </template>
      <template v-slot:append>
         <v-btn icon='mdi-cart' @click='sheet = !sheet' v-if="route.path !== '/sign-in'">
            <v-badge :content='getTotalItemsInBasket()' overlap>
               <v-icon>mdi-cart</v-icon>
            </v-badge>
         </v-btn>
      </template>
   </v-app-bar>
   <v-bottom-sheet v-model='sheet'>
      <v-card height='500'>
         <v-btn icon @click='() => sheet = false' class='back-btn'>
            <v-icon>mdi-chevron-left</v-icon>
         </v-btn>

         <v-card-text>
            <h3 class='text-center'>Кошик </h3>
            <div v-for='item in basketStore.basket' :key='item.name' class='main-basket d-flex flex-column'>
               <div class='itemBasket'>
                  <div class = "d-flex justify-end">
                     <v-btn @click='removeFromBasket(item)' color='red' dark icon='mdi-trash-can' class='btn-del'>
                     </v-btn>
                  </div>

                  <div>
                     <h3>{{ item.name }}</h3>
                     <small>{{ item.category }}</small>
                     <h5>К-сть : <i>{{ item.selectedQuantity }} кг</i></h5>
                     <h5>Продавець: <i>{{ item.author }}</i></h5>
                     <h4>Ціна: {{ item.price }} грн за кг</h4>
                  </div>

                  <div class='quantity-buttons'>
                     <v-btn @click='updateQuantity(item, 1)' class='btn-basket'>+</v-btn>
                     <v-btn @click='updateQuantity(item, -1)' class='btn-basket'>-</v-btn>

                  </div>
               </div>
               <div class='btn-price'>
                  <h4 class='text-center'>Сума: {{ item.sum }} грн</h4>
               </div>
            </div>

            <h2 class='text-center'>
               Сума до сплати: {{ calculateTotalSum() }} грн
            </h2>
                  Оформити замовлення

         </v-card-text>
      </v-card>
   </v-bottom-sheet>
</template>

<script lang='ts' setup>
import {useRouting} from '@/composables'
import {useRoute} from 'vue-router'
import {ref} from 'vue'

import {productStore} from '@/stores/product-store.ts'
import {Product} from '@/models'

defineProps<{
   headerTitle: string
}>()

const drawer = ref(false)

const routing = useRouting()
const route = useRoute()

const sheet = ref(false)
const basketStore = productStore()

const removeFromBasket = (product: Product) => {
   const index = basketStore.basket.indexOf(product)
   if (index !== -1) {
      basketStore.basket.splice(index, 1)
   }
}

let updateQuantity: (item: any, change: number) => void

updateQuantity = function(item, change) {
   item.selectedQuantity += change

   if (item.selectedQuantity < 1) {
      item.selectedQuantity = 1
   }

   item.sum = item.selectedQuantity * item.price
}

const calculateTotalSum = (): any => {
   return basketStore.basket.reduce(function(total: any, item: any) {
      if (!(item.sum !== undefined && item.sum !== null)) {
         return total
      } else {
         return total + item.sum
      }
   }, 0)
}

const getTotalItemsInBasket = (): number => {
   return basketStore.basket.length
   // return basketStore.basket.reduce((total: any, item: any) => total + item.selectedQuantity, 0)
}
</script>

<style lang='scss' scoped>
.my-padding {
   padding: 11.6px;
}

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
   flex-direction: column;
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


.btn-access-shop {
   margin: 10px 0 5px 0;
   width: 90%;
}

.quantity-buttons {
   display: flex;
   justify-content: space-around;
   align-items: center;
   margin: 15px 0;
}

.btn-basket {
   border-radius: 60px;
   height: 50px;
   width: 50px;
}

.btn-price {
   display: flex;
}

.main-basket {
   margin: 10px 10px;
   outline: 1px palegreen ridge;
   border-radius: 30px;
   padding: 10px 30px;
}

.btn-price {
   display: flex;
   justify-content: center;
}
.btn-del{
   height: 30px;
   width: 30px;
   margin: 10px 0 0 0;
}
</style>
