<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Категорії продуктів'" />

      <v-main>
         <v-container>
            <v-row>
               <v-col>
                  <v-sheet
                     class='pa-1'
                     min-height='70vh'
                     rounded='lg'
                     color='indigo-accent-2'
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
// import {storeToRefs} from 'pinia'
// import {useAppI18n} from '@/i18n'

import AppHeader from '@/components/AppHeader.vue'

// const {translate} = useAppI18n()
// const {logout} = userStore
// const {currentUser} = storeToRefs(userStore)

</script>

<style lang='scss' scoped>
.card-title {
   font-size: 1rem;
}
</style>

