<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Категорії продуктів'" />

      <v-main>
         <v-container class='py-5 pl-8 pr-9'>
            <v-row>
               <slot />
            </v-row>
            <v-sheet>
               <v-btn
                  color='primary'
                  density="comfortable"
                  class='font-weight-bold'
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
            </v-sheet>
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
.card-title {
   font-size: 1rem;
}

.v-container {
   height: calc(100vh - 64px);
   width: 100%;
   overflow: auto;
}

.v-sheet {
   position: fixed;
   top: 87px;
   right: 15px;
   display: flex;
   flex-direction: column;
}
</style>

