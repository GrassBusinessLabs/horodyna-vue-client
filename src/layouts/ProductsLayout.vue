<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Список продуктів'" />

      <v-main class='bg-grey-lighten-3'>
         <v-container>
            <v-row>
               <v-col>
                  <v-sheet
                     class='pt-5 px-2'
                     rounded='lg'
                  >
                     <slot />
                  </v-sheet>
               </v-col>
            </v-row>
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