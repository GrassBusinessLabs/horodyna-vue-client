<template>
   <div class='pa-4 pr-3 rounded-xl product-item app-item-color d-flex justify-space-between align-center'>
      <div class="d-flex justify-space-between align-center">
         <v-avatar size="80" :image="product.image"></v-avatar>
         <div class="ml-4">
            <v-list-item-title class='my-font-size my-color my-sub-margin'>
               {{ product.title }}
            </v-list-item-title>
            <v-list-item-subtitle class='my-subtitle-fs my-margin'>
               Андрій
            </v-list-item-subtitle>
            <v-list-item-subtitle class='my-subtitle-fs'>
               Рєпіна 7
               <v-icon icon="mdi-map-marker" size='15' class='text-black my-margin'></v-icon>
            </v-list-item-subtitle>
            <v-list-item-title class='my-subtitle-fs my-color my-height'>
               {{ product.price }} грн за {{ translate(product?.unit) }}
            </v-list-item-title>
         </div>
      </div>
      <div class="d-flex align-center">
         <v-icon 
            class="text-grey-darken-1" 
            icon="mdi-minus-circle-outline" 
            size='34' 
            color='black'
         ></v-icon>
         <v-list-item-subtitle class='my-font-size mx-2 font-weight-bold'>
            <!-- {{ cartStore.getCurrentProductQuantity(product) ? `${cartStore.getCurrentProductQuantity(product)}
                        ${product.unit}` : 0 }} -->
            2 {{ translate(product?.unit) }}
         </v-list-item-subtitle>
         <v-icon 
            class="text-grey-darken-1" 
            icon="mdi-plus-circle-outline" 
            size='34' 
            color='black'
         ></v-icon>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { useTranslate } from '@/composables'
import type { Offer } from "@/models"
// import { productStore } from "@/stores/product-store.ts"
// import { useRouting } from '@/composables'

defineProps<{
   product: Offer
}>()

const { translate } = useTranslate()

// const routing = useRouting()

// const cartStore = productStore()

// const addProduct = (product: Offer) => {
//    cartStore.addProductToCart({
//       ...product,
//       selectedQuantity: 1,
//    })
// }

// const showProductOnMap = (product: Offer) => {
//    cartStore.setSelectedProduct(product)
//    routing.toMap()
// }
</script>

<style scoped>
.my-margin {
   margin-bottom: 2px;
}

.my-sub-margin {
   margin-bottom: 3px;
}

.v-list-item {
   padding-top: 14px;
   padding-bottom: 14px;
}
</style>