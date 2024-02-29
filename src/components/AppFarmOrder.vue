<template>
   <div class="pa-3 py-2 rounded-xl app-item-color mb-4 d-flex justify-space-between align-center">
      <div class="d-flex justify-space-between align-center">
         <v-badge color='indigo' :content='order.order_items.length'>
            <v-avatar size="70" image="https://www.shareicon.net/data/512x512/2016/10/29/849340_clock_512x512.png"></v-avatar>
         </v-badge>
         <div class="ml-5">
            <v-list-item-title class='pt-1 my-font-size'>
               Замовлення з ферми:
            </v-list-item-title>
            <v-list-item-subtitle class='my-subtitle-fs farm-address'>
               {{ order.order_items[0].farm.address.replace("Вулиця", "") }}
            </v-list-item-subtitle>
            <v-list-item-title class='pb-1 my-margin my-color my-font-size'>
               Вартість: {{ order.total_price }} грн
            </v-list-item-title>
         </div>
      </div>
      <v-icon 
         class="text-grey-darken-1" 
         icon="mdi-information-outline" 
         size='36' @click='detailsHandler(order)'
      ></v-icon>
   </div>
</template>

<script setup lang='ts'>
import { OrderById } from '@/models'

const props = defineProps<{
   order: OrderById
}>()

const dateObject = new Date(props.order.created_data)
const formattedDate = dateObject.toLocaleString('uk-UA', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long' })

const emit = defineEmits<{
   (e: 'orderDetails', address: OrderById): void
}>()

function detailsHandler(event: OrderById): void {
   emit('orderDetails', event)
}
</script>

<style scoped>
.my-font-size {
   font-size: 17.8;
}

.farm-address {
   padding: 2px 0;
}
</style>