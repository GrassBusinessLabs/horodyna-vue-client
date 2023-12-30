<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Зміна паролю'" />

      <v-main class='d-flex align-center justify-center app-bg-color-form'>
         <slot />
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang='scss' scoped>

</style>
