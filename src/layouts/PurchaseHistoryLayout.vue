<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Історія покупок'" />

      <v-main class='bg-grey-lighten-4'>
         <v-container class='pa-5 pt-6 pb-0'>
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