<template>
   <v-bottom-navigation
      v-model="number"
      :grow='true'
      mode="shift"
      class='rounded-t-lg my-min-height app-color'
      elevation='1'
   >
      <v-btn @click='routing.toCatalog'>
         <v-icon size='23'>mdi mdi-list-box</v-icon>
         <span>Каталог</span>
      </v-btn>

      <v-btn @click='routing.toMap'>
         <v-icon size='23'>mdi mdi-map</v-icon>
         <span>Карта</span>
      </v-btn>

      <v-btn @click='routing.toPurchases'>
         <v-icon size='23'>mdi mdi-cash-clock</v-icon>
         <span>Покупки</span>
      </v-btn>
   </v-bottom-navigation>
</template>

<script lang='ts' setup>
import {ref, watch} from 'vue'
import {useRouting} from '@/composables'
import {useRoute} from 'vue-router'

const route = useRoute()
const routing = useRouting()

const number = ref(0)

watch(route, () => {
   if(route.path === '/map') {
      number.value = 1
   }
   else if (route.path === '/purchases') {
      number.value = 2
   }
})
</script>

<style lang='scss' scoped>
.my-min-height {
   min-height: 67px;
}

span {
   font-size: 14px;
}

.v-bottom-navigation {
   z-index: 1;
}
</style>
