<template>
   <div @click='detailsHandler(order)'
      class="pa-5 py-3 rounded-xl app-item-color mb-4 d-flex justify-space-between align-center">
      <div class="d-flex justify-space-between align-center">
         <v-badge color='indigo' :content='order.order_items.length'>
            <v-avatar size="70"
               :image="order.status === 'SUBMITTED' ? 'https://cdn-icons-png.flaticon.com/512/1584/1584365.png' : 'https://cdn-icons-png.flaticon.com/512/1584/1584360.png'"></v-avatar>
         </v-badge>
         <div class="ml-6">
            <v-list-item-title class='py-1 my-font-size'>
               {{ order.status === 'SUBMITTED' ? 'Статус: Очікує' :
               (order.status === 'APPROVED' ? 'Статус: Схвалено' :
               (order.status === 'DECLINED' ? 'Статус: Відхилено' :
               (order.status === 'SHIPPING' ? 'Статус: Надіслано' : 'Статус: Отримано'))) }}
            </v-list-item-title>
            <v-list-item-subtitle class='my-subtitle-fs py-1'>
               {{ formattedDate }}
            </v-list-item-subtitle>
            <v-list-item-title class='py-1 my-margin my-color my-font-size'>
               Вартість: {{ order.total_price }} грн
            </v-list-item-title>
         </div>
      </div>
   </div>
</template>

<script setup lang='ts'>
import { Order, OrderById } from '@/models'

const props = defineProps<{
   order: OrderById
}>()

const dateObject = new Date(props.order.created_data)
const formattedDate = dateObject.toLocaleString('uk-UA', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long' })

const emit = defineEmits<{
   (e: 'orderDetails', address: Order): void
}>()

function detailsHandler(event: Order): void {
   emit('orderDetails', event)
}
</script>

<style scoped>
.my-font-size {
   font-size: 17.8;
}
</style>