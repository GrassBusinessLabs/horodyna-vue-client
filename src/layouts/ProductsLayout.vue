<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Список продуктів'" />

      <v-main class='bg-grey-lighten-3'>
         <v-container>
            <v-row>
               <v-col>
                  <v-sheet
                     class='pa-3'
                     min-height='70vh'
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
import {storeToRefs} from 'pinia'

import {useUserStore} from '@/stores'
import {useAppI18n} from '@/i18n'
import AppHeader from '@/components/AppHeader.vue'

const {translate} = useAppI18n()
const userStore = useUserStore()
const {logout} = userStore
const {currentUser} = storeToRefs(userStore)
</script>

<style scoped>

</style>