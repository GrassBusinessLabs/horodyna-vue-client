<template>
   <div class="pa-5 py-4 rounded-xl app-item-color mb-5 d-flex justify-space-between align-center">
      <div class="d-flex justify-space-between align-center">
         <v-badge color='indigo' :content='purchase.products.length'>
            <v-avatar size="70" :image="purchase.products[0].image"></v-avatar>
         </v-badge>
         <div class="ml-6">
            <v-list-item-title class='py-1 my-font-size'>
               Покупка #{{ purchase.purchaseId }}
            </v-list-item-title>
            <v-list-item-subtitle class='my-subtitle-fs py-1'>
               {{ purchase.date }}
            </v-list-item-subtitle>
            <v-list-item-title class='my-margin my-color my-font-size'>
               Сума: {{ purchase.products.reduce((accumulator, currentValue) => accumulator + currentValue.price *
                  (currentValue.selectedQuantity ? currentValue.selectedQuantity : 1), 0) }}.00 грн
            </v-list-item-title>
         </div>
      </div>
      <v-icon 
         class="text-grey-darken-1" 
         icon="mdi-information-outline" 
         size='39'
         @click='detailsHandler(purchase)'
      ></v-icon>
   </div>
</template>

<script setup lang='ts'>
import { Purchase } from '@/models'

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

.my-margin {
   margin-top: 4px;
}
</style>