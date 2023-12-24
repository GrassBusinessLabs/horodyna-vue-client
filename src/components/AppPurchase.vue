<template>
   <v-list-item
      class="pa-5 py-4 rounded-xl bg-white mb-5"
      @click='detailsHandler(purchase)'
   >
      <template v-slot:prepend>
         <v-badge color='indigo' :content='purchase.products.length'>
            <v-avatar size="70" :image="purchase.products[0].img"></v-avatar>
         </v-badge>
      </template>
      <v-list-item-title class='py-1 my-font-size'>
         Покупка #{{ purchase.purchaseId }}
      </v-list-item-title>
      <v-list-item-subtitle class='text-subtitle-1 py-1'>
         {{ purchase.date }}
      </v-list-item-subtitle>
      <v-list-item-title class='pt-1 my-color my-font-size'>
         Сума: {{ purchase.products.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0) }}.00 грн
      </v-list-item-title>
      <template v-slot:append >
         <v-icon icon="mdi-information-outline" size='35'></v-icon>
      </template>
   </v-list-item>
</template>

<script setup lang='ts'>
import {Purchase} from '@/models'

defineProps<{
   purchase: Purchase
}>()

const emit = defineEmits<{
   (e: 'purchaseDetails', address: Purchase): void
}>()

function detailsHandler(event: Purchase): void {
   emit('purchaseDetails', event)
}
</script>

<style scoped>
.border-custom {
   border: 2px solid rgba(128, 128, 128, 0.3);
}

.my-border-bottom {
   border-bottom: 2px solid rgba(128, 128, 128, 0.3);
}

p {
   font-size: 3.8vw;
}

.my-font-size {
   font-size: 17.8px;
}

.my-color {
   color: #000099;
}
</style>