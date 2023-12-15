<template>
   <v-app>
      <router-view></router-view>
      <app-navigation v-if="route.path !== '/sign-in'"></app-navigation>
   </v-app>
</template>

<script setup lang='ts'>
import {onMounted} from 'vue'

import {useAppI18n} from '@/i18n'
import {useUserStore} from '@/stores'
import AppNavigation from '@/components/AppNavigation.vue'
import {useRoute} from 'vue-router'

const appI18n = useAppI18n()
const userStore = useUserStore()
const {populate} = userStore

populate()

onMounted(() => {
   appI18n.init()
})

const route = useRoute()
</script>

<style scoped>

</style>
