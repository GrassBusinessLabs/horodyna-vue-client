<template>
   <purchase-history-layout>
      <v-list
         density="compact"
         class="py-0 bg-transparent"
      >
         <app-purchase
            v-for="purchase in purchases"
            :purchase='purchase'
            :key="purchase.purchaseId"
            @purchase-details='showDetails(purchase)'
         ></app-purchase>
      </v-list>
      <v-bottom-sheet v-model="sheet">
         <v-card
            height='550'
            class='pa-0 rounded-t-lg'
         >
            <v-card-title class='py-7 text-center text-white text-h5'>
               Деталі покупки #{{ selectedPurchase.purchaseId }}
            </v-card-title>
            <v-list lines="two" class='pa-0 pt-1 px-4'>
               <v-list-item
                  v-for="product in selectedPurchase.products"
                  :key="product.name"
                  :title="product.name"
                  :prepend-avatar="product.img"
                  class='pa-0 my-border'
               >
               </v-list-item>
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </purchase-history-layout>
</template>

<script lang='ts' setup>
import AppPurchase from '@/components/AppPurchase.vue'
import PurchaseHistoryLayout from '@/layouts/PurchaseHistoryLayout.vue'
import {ref} from 'vue'

const sheet = ref(false)

const purchases = [
   {purchaseId: 351, date: '12 грудня 2023, 17:54', products: [
         {name: 'Абрикос 1', price: 50, img: 'https://knip.com.ua/content/images/1/480x463l50nn0/abrikos-viroslava-96346870734276.png', seller: 'Антон', quantity: 2},
         {name: 'Агрус 1', price: 40, img: 'https://images.unian.net/photos/2023_07/thumb_files/1000_545_1689936883-1538.jpg?1', seller: 'Степан', quantity: 3}
      ]
   },
   {purchaseId: 352, date: '13 грудня 2023, 13:22', products: [
         {name: 'Груша 1', price: 30, img: 'https://klopotenko.com/wp-content/uploads/2022/08/fruits-ga2c37054b_1920.jpg', seller: 'Антон', quantity: 5},
         {name: 'Баклажан 1', price: 70, img: 'https://ss.sport-express.ru/userfiles/materials/189/1899896/volga.jpg', seller: 'Степан', quantity: 4},
         {name: 'Абрикос 2', price: 50, img: 'https://plod.net.ua/upload/iblock/77a/77ab952ffd42c00377f96bad2bbe85f5.jpg', seller: 'Степан', quantity: 4}
      ]
   },
   {purchaseId: 353, date: '14 грудня 2023, 21:15', products: [
         {name: 'Диня 1', price: 60, img: 'https://dobrodar.ua/uploads/files/Products/Product_images_40452/4e5ff2.jpg', seller: 'Антон', quantity: 3},
         {name: 'Груша 2', price: 30, img: 'https://gradinamax.com.ua/uploads/catalog_products/grusha-medovaya_1.jpg', seller: 'Степан', quantity: 6}
      ]
   }
]

const selectedPurchase = ref({})

const showDetails = (purchase) => {
   selectedPurchase.value = purchase
   sheet.value = true
}
</script>

<style lang='scss' scoped>
.my-border {
   border-bottom: 2px solid rgba(128, 128, 128, 0.4);
}

.v-card-title {
   background-color: #135DD8;
}
</style>