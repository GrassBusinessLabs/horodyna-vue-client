<template>
   <v-bottom-navigation
      v-model="number"
      :grow='true'
      class='my-min-height app-color'
      elevation='0'
   >
      <v-btn @click='routing.toCatalog'>
         <v-icon size='20'>mdi mdi-list-box</v-icon>
         <span>Каталог</span>
      </v-btn>

      <v-btn @click='routing.toMap'>
         <v-icon size='20'>mdi mdi-map</v-icon>
         <span>Карта</span>
      </v-btn>

      <v-btn @click='routing.toPurchases'>
         <v-icon size='20'>mdi mdi-cash-clock</v-icon>
         <span>Покупки</span>
      </v-btn>
   </v-bottom-navigation>
</template>

<script lang='ts' setup>
import { useRouting } from '@/composables'
import { useCartStore, useFarmStore } from '@/stores'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routing = useRouting()

const number = ref(0)

watch(route, () => {
   if(route.path === '/catalog') {
      number.value = 0
   }
   else if(route.path === '/map') {
      number.value = 1
   }
   else if (route.path === '/purchases') {
      number.value = 2
   } else {
      number.value = -1
   }
}, { immediate: true })

const farmStore = useFarmStore()
const {populateFarms} = farmStore

populateFarms()

// const orderStore = useOrderStore()
// const {populateOrders} = orderStore

// populateOrders()

const cartStore = useCartStore()
const {setCart} = cartStore

setCart()
</script>

<style lang='scss' scoped>
.my-min-height {
   min-height: 57px;
}

span {
   font-size: 12px;
}
</style>
