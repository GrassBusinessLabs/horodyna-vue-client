<template>
   <settings-layout>
      <v-list
         density="compact"
         class="py-0 bg-transparent"
      >
         <app-setting
            v-for="setting in settings"
            :setting='setting'
            :key="setting.title"
            @click="showSettingSheet(setting.title)"
         ></app-setting>
      </v-list>
      <v-bottom-sheet v-model="sheet">
         <v-card
            height='560'
            class='pa-0 rounded-t-lg app-item-color'
         >
            <v-card-title class='py-6 mb-1 text-center my-border my-title'>
               {{ category }}
            </v-card-title>
            <v-list
               class='pa-0 ma-5 bg-transparent'
            >
               <v-list-item
                  v-for='item in filteredItems'
                  class='text-h6 pa-5 app-bg-color-form rounded-xl mb-3'
                  :class="`${item.showSwitch ? 'py-1' : 'py-4'}`"
                  @click='item.routing'
               >
                  {{ item.title}} {{ item.value }}
                  <template v-if='item.showSwitch' v-slot:append>
                     <v-switch
                        v-model='switchValue'
                        hide-details
                        :inset='true'
                     ></v-switch>
                  </template>
                  <template v-if='item.icon' v-slot:append>
                     <v-icon size='25' :icon="item.icon"></v-icon>
                  </template>
               </v-list-item>
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </settings-layout>
</template>

<script lang='ts' setup>
import SettingsLayout from '@/layouts/SettingsLayout.vue'
import AppSetting from '@/components/AppSetting.vue'
import {ref} from 'vue'
import {useUserStore} from '@/stores'
import {storeToRefs} from 'pinia'
import {useRouting} from '@/composables'

interface SettingItem {
   title: string
   category: string
   value?: string
   showSwitch: boolean
   icon: string
   routing?: Function
}

const routing = useRouting()

const settings = [
   {title: 'Аккаунт', icon: 'mdi-account-outline'},
   {title: 'Повідомлення', icon: 'mdi-bell-outline'},
   {title: 'Вигляд', icon: 'mdi-eye-outline'},
   {title: 'Приватність', icon: 'mdi-lock-outline'},
   {title: 'Написати відгук', icon: 'mdi-comment-quote-outline'},
   {title: 'Політика', icon: 'mdi-information-slab-box-outline'},
]

const switchValue = ref(false)

const sheet = ref(false)

const category = ref('')

const userStore = useUserStore()
const {currentUser} = storeToRefs(userStore)

const filteredItems = ref<SettingItem[]>([])

const showSettingSheet = (settingCategory: string) => {
   category.value = settingCategory
   sheet.value = !sheet.value
   filteredItems.value = settingsItems.filter(item => item.category === category.value)
}

const settingsItems: SettingItem[] = [
   {title: `Ім'я:`, category: 'Аккаунт', value: currentUser.value?.name, showSwitch: false, icon: ''},
   {title: 'Email:', category: 'Аккаунт', value: currentUser.value?.email, showSwitch: false, icon: ''},
   {title: 'Змінити пароль', category: 'Аккаунт', value: '', showSwitch: false, icon: 'mdi-chevron-right', routing: routing.toPasswordChange},
   {title: 'Вийти з аккаунту', category: 'Аккаунт', value: '', showSwitch: false, icon: 'mdi-chevron-right', routing: userStore.logout},
   {title: 'Сповіщати', category: 'Повідомлення', value: '', showSwitch: true, icon: ''},
]

</script>

<style lang='scss' scoped>
</style>