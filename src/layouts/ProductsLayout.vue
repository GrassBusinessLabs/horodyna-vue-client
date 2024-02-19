<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Список продуктів'" />

      <v-main class='app-bg-color'>
         <v-container class='pa-4'>
            <slot />
         </v-container>
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
.v-main {
   padding-top: 68px;
   padding-bottom: 70px;
}
</style>