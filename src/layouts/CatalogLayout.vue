<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Каталог продуктів'" />

      <v-main class='app-bg-color'>
         <v-container class='py-5 pt-2 pl-5 pr-3'>
            <v-row>
               <slot />
            </v-row>
            <v-list class='rounded bg-transparent'>
               <div
                  class='letter-block rounded-lg d-flex justify-center align-center'
                  v-for='letter in ukrainianAlphabet'
                  :key='letter'
                  :letter='letter'
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
   height: 19.5px;

   font-family: "Roboto", sans-serif;
}

.letter-block {
   height: 19.7px;
   width: 19.7px;
   font-size: 13px;
   color: #3b43d1;
   font-weight: 500;
}
</style>

