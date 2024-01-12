<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Каталог продуктів'" />

      <v-main class='app-bg-color'>
         <v-container class='pl-5 pt-2'>
            <v-row>
               <slot />
            </v-row>
            <v-list class='rounded bg-transparent'>
               <div
                  class='letter-block rounded-lg d-flex justify-center align-center'
                  v-for='letter in ukrainianAlphabet'
                  :key='letter'
                  @click='scrollToLetter(letter)'
               >
                  {{ letter }}
               </div>
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
   height: calc(100vh - 64px);
   width: 100%;
   overflow: auto;
   padding-bottom: 95px;
   padding-right: 44px;
}

.v-list {
   position: fixed;
   top: 69px;
   right: 1.3px;
   bottom: 75px;
   display: flex;
   flex-direction: column;
   padding-right: 4px;
}

.letter-block {
   height: 19.8px;
   width: 19.8px;
   font-size: 14px;
   color: #3b43d1;
   font-weight: 500;
}
</style>

