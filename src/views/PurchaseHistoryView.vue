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
            height='566'
            class='pa-0 rounded-t-lg'
         >
            <v-card-title class='py-4 text-center my-border my-title'>
               Деталі покупки #{{ selectedPurchase.purchaseId }}
               <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                  Сума: {{ selectedPurchase.products?.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0) }}.00 грн
               </v-list-item-subtitle>
            </v-card-title>
            <v-list class='pa-5 h-100'>
               <app-product
                  v-for="product in selectedPurchase.products"
                  :key='product.name'
                  :product='product'
                  class='bg-grey-lighten-4'
               />
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </purchase-history-layout>
</template>

<script lang='ts' setup>
import AppPurchase from '@/components/AppPurchase.vue'
import PurchaseHistoryLayout from '@/layouts/PurchaseHistoryLayout.vue'
import {ref} from 'vue'
import {Purchase} from '@/models'
import AppProduct from '@/components/AppProduct.vue'

const sheet = ref(false)

const purchases = [
   {purchaseId: 351, date: '12 грудня 2023', products: [
         {productId: 'p1', name: 'Абрикос 1', price: 50, img: 'https://knip.com.ua/content/images/1/480x463l50nn0/abrikos-viroslava-96346870734276.png', category: 'Абрикос', author: 'Андрій', address: 'Рєпіна 7', quantity: 2},
         {productId: 'p3', name: 'Агрус 1', price: 40, img: 'https://images.unian.net/photos/2023_07/thumb_files/1000_545_1689936883-1538.jpg?1', category: 'Агрус', author: 'Андрій', address: 'Рєпіна 7', quantity: 1},
      ]
   },
   {purchaseId: 352, date: '13 грудня 2023', products: [
         {productId: 'p2', name: 'Груша 1', price: 30, img: 'https://klopotenko.com/wp-content/uploads/2022/08/fruits-ga2c37054b_1920.jpg', category: 'Груша', author: 'Андрій', address: 'Рєпіна 9', quantity: 4},
         {productId: 'p4', name: 'Баклажан 1', price: 60, img: 'https://ss.sport-express.ru/userfiles/materials/189/1899896/volga.jpg', category: 'Баклажан', author: 'Андрій', address: 'Рєпіна 9', quantity: 2},
      ]
   },
   {purchaseId: 353, date: '14 грудня 2023', products: [
         {productId: 'p5', name: 'Диня 1', price: 70, img: 'https://dobrodar.ua/uploads/files/Products/Product_images_40452/4e5ff2.jpg', category: 'Диня', author: 'Андрій', address: 'Рєпіна 8', quantity: 3},
         {productId: 'p6', name: 'Груша 2', price: 40, img: 'https://gradinamax.com.ua/uploads/catalog_products/grusha-medovaya_1.jpg', category: 'Груша', author: 'Андрій', address: 'Рєпіна 8', quantity: 2}
      ]
   }
]

const selectedPurchase = ref<Partial<Purchase>>({})

const showDetails = (purchase: Purchase) => {
   selectedPurchase.value = purchase
   sheet.value = true
}
</script>

<style lang='scss' scoped>
</style>