<template>
   <ion-page>
      <ion-content :fullscreen='true'>
         <v-layout class='rounded rounded-md'>
            <app-header :header-title="'Список продуктів'" />

            <v-main>
               <v-container class='pa-0'>
                  <slot />
               </v-container>
            </v-main>
         </v-layout>
      </ion-content>
   </ion-page>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'
import { IonContent, IonPage } from '@ionic/vue'
</script>

<style scoped>
.v-main {
   padding-top: 64px;
   padding-bottom: 58px;
   background: var(--color-bg);
}

.v-container {
   background: var(--color-bg);
}
</style>