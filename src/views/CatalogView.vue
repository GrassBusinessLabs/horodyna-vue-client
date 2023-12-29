<template>
   <catalog-layout>
      <app-category
         v-for='(letter, index) in ukrainianAlphabet'
         :key='letter'
         :letter='letter'
         :isFirst='index === 0'
      />
   </catalog-layout>
</template>

<script lang='ts' setup>
import CatalogLayout from '@/layouts/CatalogLayout.vue'
import AppCategory from '@/components/AppCategory.vue'
import {ukrainianAlphabet} from '@/constants'

</script>

<style lang='scss' scoped>
</style>

