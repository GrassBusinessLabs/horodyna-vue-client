<template>
   <v-app-bar class='position-fixed' color='primary'>
      <template v-slot:prepend>
         <v-container>
            <v-app-bar-title>{{ headerTitle }}</v-app-bar-title>
         </v-container>
      </template>
      <template v-slot:append>
         <v-container class='pr-2'>
            <v-btn
               v-if="route.path !== '/sign-in'"
               dark
               class='pa-0 w-auto h-auto'
               icon='mdi mdi-cog'
               @click='routing.toSettings'
            >
            </v-btn>
         </v-container>
      </template>
   </v-app-bar>
</template>

<script lang='ts' setup>
import { useRouting } from '@/composables'
import { useRoute } from 'vue-router'

defineProps<{
   headerTitle: string
}>()

const routing = useRouting()
const route = useRoute()
</script>

<style lang='scss' scoped>

</style>
