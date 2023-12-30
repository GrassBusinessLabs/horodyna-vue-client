<template>
   <v-app>
      <router-view></router-view>
      <app-navigation mandatory v-if="route.path !== '/sign-in' && route.path !== '/register' && route.path !== '/password-change'">
      </app-navigation>
   </v-app>
</template>

<script setup lang='ts'>
import {useUserStore} from '@/stores'
import AppNavigation from '@/components/AppNavigation.vue'
import {useRoute} from 'vue-router'

const userStore = useUserStore()
const {populate} = userStore

populate()

const route = useRoute()
</script>

<style scoped>

</style>
