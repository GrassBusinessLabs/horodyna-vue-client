<template>
   <ion-page>
      <ion-content :fullscreen='true'>
         <v-layout class='rounded rounded-md'>
            <app-header :header-title="'Фермери'" />

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

<style lang='scss' scoped>
.v-main {
   padding-bottom: 91px;
   background: var(--color-bg);
}

.v-container {
   padding-top: 10px !important;
   background: var(--color-bg);
}
</style>