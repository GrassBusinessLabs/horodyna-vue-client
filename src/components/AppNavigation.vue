<template>
   <v-bottom-navigation
      v-model="value"
      :bg-color="'primary'"
      :grow='true'
      mode="shift"
      class='rounded-t-lg custom'
   >
      <v-btn @click='routing.toCatalog'>
         <v-icon>mdi mdi-list-box</v-icon>
         <span>Каталог</span>
      </v-btn>

      <v-btn @click='routing.toCatalog'>
         <v-icon>mdi mdi-map</v-icon>
         <span>Карта</span>
      </v-btn>

      <v-btn @click='routing.toPurchases'>
         <v-icon>mdi mdi-cash-clock</v-icon>
         <span>Покупки</span>
      </v-btn>
   </v-bottom-navigation>
</template>

<script lang='ts' setup>
import {ref} from 'vue'
import {useRouting} from '@/composables'

const routing = useRouting()

const value = ref(0)
</script>

<style lang='scss' scoped>
.custom {
   min-height: 67px;
}
</style>
