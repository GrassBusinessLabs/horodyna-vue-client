<template>
   <settings-layout>
      <v-card
         class="mx-auto pa-2 rounded-lg px-7 pb-0 pt-0"
         elevation='3'
      >
         <v-list
            density="compact"
            lines="two"
            class="py-0"
         >
            <app-setting
                v-for="(setting, index) in settings"
                :setting='setting'
                :show-divider='index !== settings.length - 1'
                :key="setting.title"
            ></app-setting>
         </v-list>
      </v-card>
   </settings-layout>
</template>

<script lang='ts' setup>
import SettingsLayout from '@/layouts/SettingsLayout.vue'
import AppSetting from '@/components/AppSetting.vue'

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
</style>