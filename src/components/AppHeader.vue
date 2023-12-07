<template>
   <v-app-bar color='primary'>
      <v-app-bar-title>{{ headerTitle }}</v-app-bar-title>

      <template v-slot:append>
         <app-select-lang />
      </template>
   </v-app-bar>
</template>

<script lang='ts' setup>
import AppSelectLang from '@/components/AppSelectLang.vue'

defineProps<{
   headerTitle: string
}>()
</script>

<style lang='scss' scoped>

</style>
