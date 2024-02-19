<template>
   <v-app>
      <router-view></router-view>
      <app-navigation mandatory v-if="route.path !== '/sign-in' && route.path !== '/register' && route.path !== '/password-change' && route.path !== '/admin-panel'">
      </app-navigation>
   </v-app>
</template>

<script setup lang='ts'>
import AppNavigation from '@/components/AppNavigation.vue'
import {useRoute} from 'vue-router'

const route = useRoute()
</script>

<style scoped>
</style>
