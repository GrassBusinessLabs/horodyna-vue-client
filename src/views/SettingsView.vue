<template>
   <settings-layout>
      <v-card
         class="mx-auto pa-2 rounded-lg px-7 pb-0 pt-0"
         elevation='3'
      >
         <v-list
            density="compact"
            lines="two"
            class="py-1"
         >
            <v-list-item
               v-for="(setting, index) in settings"
               :key="setting.title"
               color="primary"
               class="pa-0 py-5"
               :class="{ 'border-bottom': index !== settings.length - 1 }"
            >
               <template v-slot:prepend>
                  <v-icon
                     :icon="setting.icon"
                     color="black"
                     size="large"
                  ></v-icon>
               </template>

               <v-list-item-title
                  v-text="setting.title"
               ></v-list-item-title>

               <template v-slot:append>
                  <v-icon
                     size="large"
                     icon="mdi-chevron-right"
                     color="black"
                  ></v-icon>
               </template>
            </v-list-item>
         </v-list>
      </v-card>
   </settings-layout>
</template>

<script lang='ts' setup>
import SettingsLayout from '@/layouts/SettingsLayout.vue'

const settings = [
   {title: 'Аккаунт', icon: 'mdi-account-outline'},
   {title: 'Повідомлення', icon: 'mdi-bell-outline'},
   {title: 'Вигляд', icon: 'mdi-eye-outline'},
   {title: 'Приватність', icon: 'mdi-lock-outline'},
   {title: 'Підтримка', icon: 'mdi-face-agent'},
   {title: 'Про сайт', icon: 'mdi-information-outline'}
]
</script>

<style lang='scss' scoped>
.border-bottom {
   border-bottom: 1px solid rgba(128, 128, 128, 0.8);
}

.v-list-item-title {
   font-size: 18px;
}
</style>