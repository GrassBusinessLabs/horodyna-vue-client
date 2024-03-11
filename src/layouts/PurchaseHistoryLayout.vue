<template>
   <ion-page>
      <ion-content :fullscreen='true'>
         <v-layout class='rounded rounded-md'>
            <app-header :header-title="'Мої замовлення'" />

            <v-main class='app-bg-color'>
               <v-container class='pa-5 pb-0'>
                  <slot />
               </v-container>
            </v-main>
         </v-layout>
      </ion-content>
   </ion-page>
</template>

<script lang='ts' setup>
import { IonContent, IonPage } from '@ionic/vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang='scss' scoped>
.v-main {
   padding-bottom: 68px;
}

.v-container {
   padding-top: 17px !important;
}
</style>