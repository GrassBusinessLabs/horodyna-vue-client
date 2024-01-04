<template>
   <orders-layout>
      <v-list
         density="compact"
         class="py-0 bg-transparent"
      >
         <app-order
            v-for="order in orders?.items"
            :order='order'
            :key="order.id"
            @order-details='showOrderDetails(order)'
         ></app-order>
      </v-list>

      <v-bottom-sheet v-model="sheet">
         <v-card
            height='566'
            class='pa-0 rounded-t-lg'
         >
            <v-card-title class='py-4 text-center my-border my-title'>
               Деталі покупки #{{ selectedOrder.id }}
               <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                  Сума: {{ selectedOrder.order_items.reduce((accumulator, currentValue) => accumulator + currentValue.price * (currentValue.selectedQuantity ? currentValue.selectedQuantity : 1), 0) }}.00 грн
               </v-list-item-subtitle>
            </v-card-title>
            <v-list class='pa-5 h-100'>
               <app-product
                  v-for="product in selectedOrder.order_items"
                  :key='product.id'
                  :product='product'
                  class='bg-grey-lighten-4'
               />
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </orders-layout>
</template>

<script lang='ts' setup>
import AppOrder from '@/components/AppOrder.vue'
import OrdersLayout from '@/layouts/OrdersLayout.vue'
import AppProduct from '@/components/AppProduct.vue'
import { useOrderStore } from '@/stores/order-store.ts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { Order } from '@/models'

const orderStore = useOrderStore()
const {populateOrders} = orderStore
const {orders} = storeToRefs(orderStore)

populateOrders()

const sheet = ref(false)

const selectedOrder = ref<Partial<Order>>({})

const showOrderDetails = (order: Order) => {
   selectedOrder.value = order
   sheet.value = true
}
</script>

<style lang='scss' scoped>
</style>