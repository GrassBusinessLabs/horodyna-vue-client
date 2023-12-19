<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Карта з фермами'" />

      <v-main>
         <v-container class='pa-5'>
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

