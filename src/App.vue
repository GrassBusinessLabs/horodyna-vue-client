<template>
   <v-app>
      <ion-app>
         <ion-router-outlet />
         <app-navigation mandatory v-if="route.path !== '/sign-in' && route.path !== '/register' && route.path !== '/admin-panel'">
      </app-navigation>
      </ion-app>
   </v-app>
</template>

<script setup lang='ts'>
import AppNavigation from '@/components/AppNavigation.vue'
import { useAppI18n } from '@/i18n'
import { useUserStore } from '@/stores'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const appI18n = useAppI18n()
const userStore = useUserStore()
const {populate} = userStore

populate()

onMounted(() => {
   appI18n.init()
})
</script>

<style scoped>

</style>
