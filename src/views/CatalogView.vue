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
import {useCartStore, useOfferStore, useOrderStore, useUserStore} from '@/stores'

const userStore = useUserStore()
const {populate} = userStore

populate()

const cartStore = useCartStore()
const {setCart} = cartStore

setCart()

const orderStore = useOrderStore()
const {populateOrders} = orderStore

populateOrders()

const offerStore = useOfferStore()
const {populateOffers} = offerStore

populateOffers()

</script>

<style lang='scss' scoped>
</style>

