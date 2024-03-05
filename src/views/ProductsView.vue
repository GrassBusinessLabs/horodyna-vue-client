<template>
   <products-layout>
      <v-list v-if="filteredOffers?.length" class='pa-0 bg-transparent'>
         <app-product
            v-for='offer in filteredOffers'
            :key='offer.id'
            :offer='offer'
         />
      </v-list>
      <v-sheet v-else class='mx-auto pa-6 pt-5 rounded-lg'>
         <v-list-item-title
            class='no-item-title text-center py-1'
         >
            Поки що немає жодного товару
         </v-list-item-title>
         <v-btn
            class='text-white mt-4 w-100 rounded-lg app-color'
            @click='routing.toCatalog()'
            variant='flat'
         >
            Перейти в каталог
         </v-btn>
      </v-sheet>
   </products-layout>
</template>

<script setup lang='ts'>
import AppProduct from '@/components/AppProduct.vue'
import { useRouting } from '@/composables'
import ProductsLayout from '@/layouts/ProductsLayout.vue'
import { Offer } from '@/models'
import { useCategoryStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { onIonViewWillEnter } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const routing = useRouting()

const categoryStore = useCategoryStore()
const {getCurrentCategory} = categoryStore
const currentCategory = ref<string | null>(null)

const offerStore = useOfferStore()
const {populateOffers} = offerStore
const {offers} = storeToRefs(offerStore)

const filteredOffers = ref()

const orderStore = useOrderStore()
const {populateOrders} = orderStore

const farmStore = useFarmStore()
const {populateFarms} = farmStore

onIonViewWillEnter(async () => {
   await populateOffers()
   await populateOrders()
   await populateFarms()

   currentCategory.value = getCurrentCategory()
   filteredOffers.value = offers.value?.filter((offer: Offer) => offer.category === currentCategory.value)
})

</script>

<style scoped>
.no-item-title {
   font-size: 30px;
   white-space: normal;
}
</style>