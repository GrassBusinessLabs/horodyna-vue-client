<template>
   <v-btn @click='isOpen = true' :block='true' class='pb-0 rounded-lg text-white my-orange-color' variant='flat'>
      Переглянути продукти
   </v-btn>

   <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
      :initial-breakpoint="0.7">
      <ion-content style="--background: transparent">
         <v-card height='700' class='pa-0 rounded-t-lg app-item-color'>
            <v-card-title class='py-4 text-center my-border my-title'>
               {{ isShowPaymentProducts ? 'Продукти до сплати' : 'Кошик' }}
               <v-list-item-subtitle v-if='cart?.order_items.length' class='my-subtitle pt-2 pb-1'>
                  Сума: {{ cart?.product_price }} грн
               </v-list-item-subtitle>
            </v-card-title>

            <v-list v-if='cart?.order_items.length' max-height="243" class='pa-5 pb-0 bg-transparent'>
               <app-product v-for="item in cart.order_items" :key="item.id" :offer='getOfferById(item.offer_id)'
                  class='app-bg-color-form' />
            </v-list>

            <template v-else>
               <v-list-item-title class='mx-5 pb-1 mt-6 no-item-title text-center'>
                  Немає жодного товару
               </v-list-item-title>

            </template>
            <v-card-actions v-if="!isShowPaymentProducts" class="d-flex justify-center pt-0 px-5">
               <v-btn block v-if='cart?.order_items.length' color='orange' class='text-white mx-5 my-5 rounded-lg'
                  @click='goToPayment' variant='flat'>
                  Оформити замовлення
               </v-btn>
               <v-btn v-else block color='orange' class='text-white mx-5 my-5 rounded-lg' @click='goToCatalog'
                  variant='flat'>
                  Перейти в каталог
               </v-btn>
            </v-card-actions>
         </v-card>
      </ion-content>
   </ion-modal>
</template>

<script lang='ts' setup>
import AppProduct from '@/components/AppProduct.vue'
import { useRouting } from '@/composables'
import { useAddressStore, useCartStore, useOfferStore } from '@/stores'
import { IonContent, IonModal } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
   isShowPaymentProducts?: boolean
}>()

const offerStore = useOfferStore()
const { getOfferById } = offerStore

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)

const addressStore = useAddressStore()
const { populateAddresses, getUserAddress } = addressStore

const userAddress = ref<string | undefined>()

const routing = useRouting()
const route = useRoute()

const drawer = ref(false)

const isOpen = ref(false)

const modalDismissed = () => {
   isOpen.value = false
}

const goToCatalog = () => {
   isOpen.value = false
   routing.toCatalog()
}

const goToPayment = () => {
   isOpen.value = false
   routing.toPayment()
}

watch(drawer, async () => {
   if (drawer.value) {
      await populateAddresses()
      userAddress.value = getUserAddress()
   }
})
</script>

<style lang='scss' scoped>
.my-padding {
   padding: 11.6px;
   padding-top: 9.5px;
}

.v-app-bar {
   background-color: #6168DB;
}

.no-item-title {
   font-size: 36px;
   white-space: normal;
   line-height: 1;
}

.user-name {
   font-size: 19px;
}

.my-orange-color {
   background-color: #fb8a00c9;
}
</style>
