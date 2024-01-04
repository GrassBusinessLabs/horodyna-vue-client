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
                  Сума: {{ selectedPurchase.products?.reduce((accumulator, currentValue) => accumulator + currentValue.price * (currentValue.selectedQuantity ? currentValue.selectedQuantity : 1), 0) }}.00 грн
               </v-list-item-subtitle>
            </v-card-title>
            <v-list class='pa-5 h-100'>
               <app-product
                  v-for="product in selectedPurchase.products"
                  :key='product.id'
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
         {id: 1, title: 'Абрикос 1', description: 'Опис товару', price: 50, unit: 'кг', stock: 10, status: true, image: 'https://knip.com.ua/content/images/1/480x463l50nn0/abrikos-viroslava-96346870734276.png', user_id: 1, farm_id: 1, category: 'Абрикос', seller: 'Андрій', address: 'Рєпіна 7'},
         {id: 3, title: 'Агрус 1', description: 'Опис товару', price: 40, unit: 'кг', stock: 10, status: true, image: 'https://images.unian.net/photos/2023_07/thumb_files/1000_545_1689936883-1538.jpg?1', user_id: 1, farm_id: 1, category: 'Агрус', seller: 'Андрій', address: 'Рєпіна 7'},
      ]
   },
   {purchaseId: 352, date: '13 грудня 2023', products: [
         {id: 2, title: 'Груша 1', description: 'Опис товару', price: 30, unit: 'кг', stock: 10, status: true, image: 'https://klopotenko.com/wp-content/uploads/2022/08/fruits-ga2c37054b_1920.jpg', user_id: 1, farm_id: 2, category: 'Груша', seller: 'Андрій', address: 'Рєпіна 9'},
         {id: 4, title: 'Баклажан 1', description: 'Опис товару', price: 60, unit: 'кг', stock: 10, status: true, image: 'https://ss.sport-express.ru/userfiles/materials/189/1899896/volga.jpg', user_id: 1, farm_id: 2, category: 'Баклажан', seller: 'Андрій', address: 'Рєпіна 9'},
      ]
   },
   {purchaseId: 353, date: '14 грудня 2023', products: [
         {id: 5, title: 'Диня 1', description: 'Опис товару', price: 70, unit: 'кг', stock: 10, status: true, image: 'https://dobrodar.ua/uploads/files/Products/Product_images_40452/4e5ff2.jpg', user_id: 1, farm_id: 3, category: 'Диня', seller: 'Андрій', address: 'Рєпіна 8'},
         {id: 6, title: 'Груша 2', description: 'Опис товару', price: 40, unit: 'кг', stock: 10, status: true, image: 'https://gradinamax.com.ua/uploads/catalog_products/grusha-medovaya_1.jpg', user_id: 1, farm_id: 3, category: 'Груша', seller: 'Андрій', address: 'Рєпіна 8'}
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