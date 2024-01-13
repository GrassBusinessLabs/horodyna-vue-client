<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Мої замовлення'" />

      <v-main class='app-bg-color'>
         <v-container class='pa-5 pb-0'>
            <slot />
         </v-container>
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang='scss' scoped>
.v-main {
   padding-bottom: 71px;
}
</style>