<template>
   <v-navigation-drawer
      v-model="drawer"
      :temporary='true'
   >
      <v-list-item
         prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
         class='my-padding'
      >
         <v-list-item-title class='text-h6'>User Name</v-list-item-title>
         <v-list-item-subtitle class='text-subtitle-1'>sa@test.com</v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" :nav='true'>
         <v-list-item @click='routing.toSettings'>
            <template v-slot:prepend>
               <v-icon icon="mdi mdi-cog"></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Налаштування</v-list-item-title>
            </template>
         </v-list-item>
         <v-list-item @click='routing.toSettings'>
            <template v-slot:prepend>
               <v-icon icon="mdi-face-agent"></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Підтримка</v-list-item-title>
            </template>
         </v-list-item>
         <v-list-item @click=routing.toSettings>
            <template v-slot:prepend>
               <v-icon icon="mdi-information-outline"></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Про сайт</v-list-item-title>
            </template>
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
   <v-app-bar class='position-fixed' color='primary'>
      <template v-slot:prepend>
         <v-container class='d-flex'>
            <v-btn
               v-if="route.path !== '/sign-in'"
               class='pa-0 w-auto h-auto mr-4'
               icon="mdi mdi-menu"
               @click.stop="drawer = !drawer"
            >
            </v-btn>
            <v-app-bar-title>{{ headerTitle }}</v-app-bar-title>
         </v-container>
      </template>
   </v-app-bar>
</template>

<script lang='ts' setup>
import { useRouting } from '@/composables'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

defineProps<{
   headerTitle: string
}>()

const drawer = ref(false)

const routing = useRouting()
const route = useRoute()
</script>

<style lang='scss' scoped>
.my-padding {
   padding: 11.6px;
}
</style>
