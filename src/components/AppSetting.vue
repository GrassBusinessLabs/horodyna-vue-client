<template>
   <v-list-item
      class="pa-0 py-5 pl-5 pr-4 app-item-color setting-item rounded-xl"
   >
      <v-row>
         <v-col cols='auto' class='pr-4'>
            <v-icon
               :icon="setting.icon"
               size="large"
               class='text-grey-darken-2'
            ></v-icon>
         </v-col>
         <v-col cols='auto' class='pa-0 pt-4 pr-3'>
            <v-list-item-title
               v-text="setting.title"
               class='text-grey-darken-3'
            ></v-list-item-title>
         </v-col>
      </v-row>
      <template v-slot:append>
         <v-icon size='25' icon="mdi-chevron-right"></v-icon>
      </template>
   </v-list-item>
</template>

<script setup lang='ts'>
interface Setting {
   title: string
   icon: string
}

defineProps<{
   setting: Setting
}>()
</script>

<style scoped>
.v-list-item-title {
   font-size: 18px;
}

.setting-item {
   margin-bottom: 14px;
}

.setting-item:last-child {
   margin-bottom: 0;
}
</style>