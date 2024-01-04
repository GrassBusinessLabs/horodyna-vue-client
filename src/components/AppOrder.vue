<template>
   <v-list-item
      class="pa-5 py-4 rounded-xl app-item-color mb-5"
   >
      <v-list-item-title class='py-1 my-font-size'>
         Статус: {{ orderStatus }}
      </v-list-item-title>
      <v-list-item-subtitle class='my-subtitle-fs py-1'>
         {{ order.comment }}
      </v-list-item-subtitle>
      <v-list-item-title class='my-margin my-color my-font-size'>
      </v-list-item-title>
      <template v-slot:append>
         <v-icon
            icon="mdi-information-outline"
            size='39'
            @click='detailsHandler(order)'
         ></v-icon>
      </template>
   </v-list-item>
</template>

<script setup lang='ts'>
import { Order } from '@/models'
import { computed } from 'vue'

const props = defineProps<{
   order: Order
}>()

const orderStatus = computed(() => {
   switch(props.order.status) {
      case 'DRAFT': 
         return 'Чернетка'
      case 'ACTIVE': 
         return 'Активний'
      default:
         return 'Очікує'
   }
})

const emit = defineEmits<{
   (e: 'orderDetails', address: Order): void
}>()

function detailsHandler(event: Order): void {
   emit('orderDetails', event)
}
</script>

<style scoped>
</style>