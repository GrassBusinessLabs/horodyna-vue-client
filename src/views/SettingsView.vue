<template>
   <settings-layout>
      <v-list
         density="compact"
         lines="two"
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
            height='395'
            class='bg-grey-lighten-4 px-5 py-5'
         >
            <v-list
               class='pa-0 rounded-lg my-border'
            >
               <v-list-item
                  v-for='item in filteredItems'
                  class='text-h6 bg-white pa-5'
                  :class="`${item.showSwitch ? 'py-1' : 'py-4'}`"
               >
                  {{ item.title}} {{ item.value }}
                  <template v-if='item.showSwitch' v-slot:append>
                     <v-switch
                        v-model='switchValue'
                        hide-details
                        :inset='true'
                     ></v-switch>
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

interface SettingItem {
   title: string
   category: string
   value: string
   showSwitch: boolean
}

const settings = [
   {title: 'Аккаунт', icon: 'mdi-account-outline'},
   {title: 'Повідомлення', icon: 'mdi-bell-outline'},
   {title: 'Вигляд', icon: 'mdi-eye-outline'},
   {title: 'Приватність', icon: 'mdi-lock-outline'},
   {title: 'Підтримка', icon: 'mdi-face-agent'},
   {title: 'Про сайт', icon: 'mdi-information-outline'}
]

const switchValue = ref(false)

const sheet = ref(false)

const category = ref('')

const userStore = useUserStore()
const {currentUser} = storeToRefs(userStore)
const {name, email} = currentUser.value

const filteredItems = ref<SettingItem[]>([])

const showSettingSheet = (settingCategory: string) => {
   category.value = settingCategory
   sheet.value = !sheet.value
   filteredItems.value = settingsItems.filter(item => item.category === category.value)
}

const settingsItems: SettingItem[] = [
   {title: `Ім'я:`, category: 'Аккаунт', value: name, showSwitch: false},
   {title: 'Email:', category: 'Аккаунт', value: email, showSwitch: false},
   {title: 'Сповіщати', category: 'Повідомлення', value: '', showSwitch: true},
]

</script>

<style lang='scss' scoped>
.my-border {
   border: 2px solid rgba(2, 0, 112, 0.5);
}

.my-border .v-list-item {
   border-bottom: 2px solid rgba(2, 0, 112, 0.5);
}

.my-border .v-list-item:last-child {
   border-bottom: none;
}
</style>