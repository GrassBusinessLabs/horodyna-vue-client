<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Каталог продуктів'" />

      <v-main class='app-bg-color'>
         <v-container class='py-5 pt-2 pl-5 pr-3'>
            <v-row>
               <slot />
            </v-row>
            <v-list class='rounded bg-transparent'>
               <v-btn
                  density="comfortable"
                  class='w-auto h-auto font-weight-bold'
                  variant="text"
                  size="x-small"
                  :icon="''"
                  v-for='letter in ukrainianAlphabet'
                  :key='letter'
                  :letter='letter'
                  @click='scrollToLetter(letter)'
               >
                  {{ letter }}
               </v-btn>
            </v-list>
         </v-container>
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'
import {ukrainianAlphabet} from '@/constants'

const scrollToLetter = (letter: string) => {
   const element = document.querySelector(`.${letter}`)
   if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
   }
}

</script>

<style lang='scss' scoped>
.v-container {
   height: calc(100vh - 131px);
   width: 100%;
   overflow: auto;
}

.v-list {
   position: fixed;
   top: 69px;
   right: 0;
   display: flex;
   flex-direction: column;
   padding-right: 4px;
}

.v-btn {
   padding: 2.9px;
   font-size: 3vw;
   color: #3b43d1;
}
</style>

