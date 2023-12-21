<template>
   <v-list-item
      class="pa-0 pt-4 mb-5 rounded-lg bg-white border-custom"
   >
      <v-row>
         <v-col cols='12' class='pr-4 pb-0'>
            <v-list-item-title class='text-h6 mb-2 px-5'>
               Покупка #{{ purchase.purchaseId }}
            </v-list-item-title>
            <v-list-item-subtitle class='text-subtitle-1 px-5'>
               {{ purchase.date }}
            </v-list-item-subtitle>
         </v-col>
         <v-col cols='12' class='pt-4 pb-0'>
            <v-list class='pa-0' max-height='276'>
               <v-list-item
                  class='pa-0 mx-5 mb-3 pb-3 my-border-bottom'
                  v-for='product in purchase.products'
               >
                  <template v-slot:prepend>
                     <v-avatar size="80" :image="product.img"></v-avatar>
                  </template>
                  <v-list-item-title class='text-h6 ml-2 mb-3 pt-3'>
                     {{ product.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class='text-subtitle-1 ml-2'>
                     Продавець: {{ product.seller }}
                  </v-list-item-subtitle>
                  <v-list-item class='pa-0 pr-2 ml-2'>
                     <template v-slot:prepend class='h-auto'>
                        <p>Ціна: {{ product.price }} грн</p>
                     </template>
                     <template v-slot:append>
                        <p>Кількість: {{ product.quantity }} кг</p>
                     </template>
                  </v-list-item>
               </v-list-item>
            </v-list>
         </v-col>
         <v-col cols='12' class='pb-8 pt-0'>
            <v-list-item-title class='text-h6 mb-2 px-5 mt-2'>
               Товарів: {{ purchase.products.length }}
            </v-list-item-title>
            <v-list-item-subtitle class='text-subtitle-1 px-5'>
               Сума: {{ purchase.products.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0) }}.00 грн
            </v-list-item-subtitle>
         </v-col>
      </v-row>
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

function emitDetails(event: Purchase): void {
   emit('purchaseDetails', event)
}
</script>

<style scoped>
.v-list-item-title {
   color: rgba(2, 0, 112, 0.9);
}

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