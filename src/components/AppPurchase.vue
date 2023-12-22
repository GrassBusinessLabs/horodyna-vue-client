<template>
   <v-list-item
      class="pa-6 rounded-xl bg-white mb-5"
      @click='detailsHandler(purchase)'
   >
      <template v-slot:prepend>
         <v-badge color='indigo' :content='purchase.products.length'>
            <v-avatar size="58" :image="purchase.products[0].img"></v-avatar>
         </v-badge>
      </template>
      <v-list-item-title class='text-h6 py-1'>
         Покупка #{{ purchase.purchaseId }}
      </v-list-item-title>
      <v-list-item-subtitle class='text-subtitle-1 py-1'>
         {{ purchase.date }}
      </v-list-item-subtitle>
      <template v-slot:append >
         <v-icon icon="mdi-information-outline" size='35'></v-icon>
      </template>
   </v-list-item>
</template>

<script setup lang='ts'>
interface ProductItem {
   name: string
   price: number
   img: string
   seller: string
   quantity: number
}

interface Purchase {
   purchaseId: number
   date: string
   products: ProductItem[]
}

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
</style>