<template>
   <v-list-item
      color="primary"
      class="pa-0 py-5"
      :class="{ 'border-bottom': showDivider }"
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
         <v-btn
            size="small"
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="toggleShow"
            variant='flat'
         ></v-btn>
      </template>
   </v-list-item>
   <v-expand-transition>
      <div v-show="show" class='bg-grey-lighten-5  border-bottom'>
         <template v-for='item in filteredItems'>
            <v-card-text class='px-4 text-subtitle-1'>
               {{ item.title }} {{ item.value }}
            </v-card-text>
            <v-divider></v-divider>
         </template>
      </div>
   </v-expand-transition>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {useUserStore} from '@/stores'
import {storeToRefs} from 'pinia'

interface Setting {
   title: string
   icon: string
}

const props = defineProps<{
   setting: Setting
   showDivider: boolean
}>()

const userStore = useUserStore()
const {currentUser} = storeToRefs(userStore)
const {name, email} = currentUser.value

const settingsItems = [
   {title: `Ім'я:`, category: 'Аккаунт', value: name},
   {title: `Email:`, category: 'Аккаунт', value: email}
]

const filteredItems = settingsItems.filter(item => item.category === props.setting.title)

const toggleShow = () => {
   if(filteredItems.length !== 0) {
      show.value = !show.value
   }
}
const show = ref(false)
</script>

<style scoped>
.border-bottom {
   border-bottom: 1px solid rgba(128, 128, 128, 0.8);
}

.v-list-item-title {
   font-size: 18px;
}
</style>