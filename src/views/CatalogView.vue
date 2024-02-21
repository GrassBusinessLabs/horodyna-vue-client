<template>
   <catalog-layout>
      <app-category v-for='(letter, index) in ukrainianAlphabet' :key='letter' :letter='letter' :isFirst='index === 0' />
   </catalog-layout>
</template>

<script lang='ts' setup>
import CatalogLayout from '@/layouts/CatalogLayout.vue'
import AppCategory from '@/components/AppCategory.vue'
import { ukrainianAlphabet } from '@/constants'
import { useCartStore, useOfferStore, useOrderStore, useUserStore } from '@/stores'
import { onIonViewDidEnter } from '@ionic/vue'

const userStore = useUserStore()
const { populate } = userStore

const cartStore = useCartStore()
const { setCart } = cartStore

const orderStore = useOrderStore()
const { populateOrders } = orderStore

const offerStore = useOfferStore()
const { populateOffers } = offerStore

onIonViewDidEnter(async () => {
   await populate()
   await populateOffers()
   await populateOrders()
   await setCart()
})

</script>

<style lang='scss' scoped></style>

