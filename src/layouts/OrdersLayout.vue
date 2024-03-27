<template>
   <ion-page>
      <ion-content :fullscreen='true'>
         <v-layout class='rounded rounded-md'>
            <app-header :header-title="'Замовлення по фермам'" />

            <v-main class='app-bg-color'>
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
   padding-bottom: 71px;
   background: var(--color-bg);
}
</style>