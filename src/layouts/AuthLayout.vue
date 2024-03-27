<template>
   <ion-page>
      <ion-content :fullscreen='true'>
         <v-layout class='rounded rounded-md'>
            <v-main class='d-flex align-center justify-center app-bg-color-form'>
               <slot />
            </v-main>
         </v-layout>
      </ion-content>
   </ion-page>
</template>

<script lang='ts' setup>
import { IonContent, IonPage } from '@ionic/vue'
</script>

<style lang='scss' scoped>
.v-main {
   background: var(--color-bg);
}
</style>
