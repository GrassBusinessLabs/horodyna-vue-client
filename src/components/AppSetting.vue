<template>
   <v-list-item
      class="pa-0 py-4 pl-4 mb-5 rounded-lg bg-transparent"
   >
      <v-row>
         <v-col cols='auto' class='pr-4'>
            <v-icon
               :icon="setting.icon"
               size="large"
            ></v-icon>
         </v-col>
         <v-col cols='auto' class='pa-0 pt-4 pr-3'>
            <v-list-item-title
               v-text="setting.title"
            ></v-list-item-title>
         </v-col>
      </v-row>
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

.v-list-item {
   border: 2px solid rgba(2, 0, 112, 0.5);
}

.v-icon {
   color: rgba(2, 0, 112, 0.8);
}

.v-list-item-title {
   color: rgba(2, 0, 112, 0.9);
}
</style>