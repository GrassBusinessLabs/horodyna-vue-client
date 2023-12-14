<template>
   <v-app-bar color='primary'>
      <template v-slot:prepend>
         <v-container>
            <v-app-bar-title>{{ headerTitle }}</v-app-bar-title>
         </v-container>
      </template>
      <template v-slot:append>
         <v-container class='pr-1'>
            <v-menu>
               <template v-if="route.path !== '/sign-in'" v-slot:activator="{ props }">
                  <v-btn
                     dark
                     v-bind="props"
                     class='pa-0'
                  >
                     Меню
                  </v-btn>
               </template>

               <v-list>
                  <v-list-item
                     v-for="(item, index) in items"
                     :key="index"
                     @click='item.routing'
                  >
                     <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
               </v-list>
            </v-menu>
         </v-container>
      </template>
   </v-app-bar>
</template>

<script lang='ts' setup>
import { useRouting } from '@/composables'
import { useRoute } from 'vue-router'
import {useUserStore} from '@/stores'

defineProps<{
   headerTitle: string
}>()

const userStore = useUserStore()

const routing = useRouting()
const route = useRoute()

const items = [
   { title: 'Каталог', routing: routing.toCatalog },
   { title: 'Покупки', routing: routing.toPurchases},
   { title: 'Налаштування', routing: routing.toSettings },
   { title: 'Вийти', routing: userStore.logout },
]

</script>

<style lang='scss' scoped>

</style>
