<template>
   <div class="pa-5 py-3 rounded-xl app-item-color mb-5 d-flex justify-space-between align-center">
      <div class="d-flex justify-space-between align-center">
         <v-badge color='indigo' :content='order.order_items_count'>
            <v-avatar size="70" image="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png"></v-avatar>
         </v-badge>
         <div class="ml-6">
            <v-list-item-title class='py-1 my-font-size'>
               Замовлення #{{ order.id }}
            </v-list-item-title>
            <v-list-item-subtitle class='my-subtitle-fs py-1'>
               {{ formattedDate }}
            </v-list-item-subtitle>
            <v-list-item-title class='py-1 my-margin my-color my-font-size'>
               Сума: {{ order.total_price }} грн
            </v-list-item-title>
         </div>
      </div>
      <v-icon 
         class="text-grey-darken-1" 
         icon="mdi-information-outline" 
         size='39' @click='detailsHandler(order)'
      ></v-icon>
   </div>
</template>

<script setup lang='ts'>
import { Order } from '@/models'

const props = defineProps<{
   order: Order
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