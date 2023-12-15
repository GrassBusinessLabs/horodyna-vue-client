<template>
   <v-bottom-navigation
      v-model="value"
      color="teal"
      grow
   >
      <v-btn @click='routing.toCatalog'>
         <v-icon>mdi mdi-list-box</v-icon>
         Каталог
      </v-btn>

      <v-btn @click='routing.toCatalog'>
         <v-icon>mdi mdi-map</v-icon>
         Карта
      </v-btn>

      <v-btn @click='routing.toPurchases'>
         <v-icon>mdi mdi-cash-clock</v-icon>
         Покупки
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

</style>
