<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Оплата товарів'" />

      <v-main class='app-bg-color'>
         <v-container class='pa-5 pt-6'>
            <slot />
         </v-container>
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang='scss' scoped>
</style>