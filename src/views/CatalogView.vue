<template>
   <catalog-layout>
         <app-category
            v-for='letter in ukrainianAlphabet'
            :key='letter'
            :letter='letter'
         />
   </catalog-layout>
</template>

<script lang='ts' setup>
import CatalogLayout from '@/layouts/CatalogLayout.vue'
import AppCategory from '@/components/AppCategory.vue'

const ukrainianAlphabet = 'АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЮЯ'
</script>

<style lang='scss' scoped>
</style>

