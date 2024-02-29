<template>
   <v-navigation-drawer v-model='drawer' :temporary='true' class='position-fixed' width='290'>
      <v-list-item class='my-padding pl-4 pb-2'>
         <v-list-item-title class='user-name app-font-regular'>{{ currentUser?.name }}</v-list-item-title>
         <app-address-form :user-address="userAddress" :is-menu-button="true" @close-menu="drawer = false"></app-address-form>
      </v-list-item>
      <v-divider thickness='2'></v-divider>

      <v-list density='compact' :nav='true' class='mt-2'>
         <v-list-item-subtitle class='my-font-size ml-2 mb-2 mt-1'>
            ОГЛЯД
         </v-list-item-subtitle>
         <v-list-item v-for="item in menuOverviewItems" :key="item.name" @click="item.routing" class='pl-0 pt-0 mb-0'>
            <template v-slot:prepend>
               <v-icon size='27' icon="mdi-chevron-right"></v-icon>
               <v-icon class='mx-1' :icon='item.icon'></v-icon>
               <p class='my-font-size ml-2'>{{ item.name }}</p>
            </template>
         </v-list-item>
      </v-list>
      <v-list density='compact' :nav='true' class='pt-1'>
         <v-list-item-subtitle class='my-font-size ml-2 mb-2 mt-1'>
            АККАУНТ
         </v-list-item-subtitle>
         <v-list-item v-for="item in menuAccountItems" :key="item.name" @click="item.routing" class='pl-0 pt-0 mb-0'>
            <template v-slot:prepend>
               <v-icon size='27' icon="mdi-chevron-right"></v-icon>
               <v-icon class='mx-1' :icon='item.icon'></v-icon>
               <p class='my-font-size ml-2'>{{ item.name }}</p>
            </template>
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
   <v-app-bar class='position-fixed text-white' elevation='0'>
      <template v-slot:prepend>
         <v-container class='d-flex pl-3'>
            <v-btn
               v-if="route.path !== '/sign-in' && route.path !== '/register' && route.path !== '/password-change' && route.path !== '/admin-panel' && route.path !== '/payment' && route.path !== '/orders' && route.path !== '/products'"
               class='pa-0 w-auto h-auto mr-4' icon='mdi-menu' @click.stop='drawer = !drawer'>
            </v-btn>
            <v-btn v-if="route.path === '/admin-panel'" class='pa-0 w-auto h-auto mr-4' icon='mdi-arrow-left'
               @click='routing.toCatalog'>
            </v-btn>
            <v-btn v-if="route.path === '/payment'" class='pa-0 w-auto h-auto mr-4' icon='mdi-arrow-left'
               @click='routing.toOrders'>
            </v-btn>
            <v-btn v-if="route.path === '/orders'" class='pa-0 w-auto h-auto mr-4' icon='mdi-arrow-left'
               @click='routing.toCatalog'>
            </v-btn>
            <v-btn v-if="route.path === '/products'" class='pa-0 w-auto h-auto mr-4' icon='mdi-arrow-left'
               @click='routing.toCatalog'>
            </v-btn>
            <v-app-bar-title>{{ headerTitle }}</v-app-bar-title>
         </v-container>
      </template>
      <template v-slot:append>
         <v-btn icon='mdi-cart' @click='isOpen = !isOpen'
            v-if="route.path !== '/sign-in' && route.path !== '/register' && route.path !== '/password-change' && route.path !== '/admin-panel' && route.path !== '/payment' && route.path !== '/orders'">
            <v-badge v-if="cart?.order_items.length" color="grey-darken-4"
               :content='cart?.order_items.length ? cart?.order_items.length : 0'>
               <v-icon>mdi-cart</v-icon>
            </v-badge>
            <v-icon v-else class="ml-2">mdi-cart</v-icon>
         </v-btn>
      </template>
   </v-app-bar>

   <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
      :initial-breakpoint="0.7">
      <ion-content style="--background: transparent">
         <v-card height='700' class='pa-0 rounded-t-lg app-item-color'>
            <v-card-title class='py-4 text-center my-border my-title'>
               Кошик
               <v-list-item-subtitle v-if='cart?.order_items.length' class='my-subtitle pt-2 pb-1'>
                  Сума: {{ cart?.product_price }} грн
               </v-list-item-subtitle>
            </v-card-title>

            <v-list v-if='cart?.order_items.length' max-height="243" class='pa-5 pb-0 bg-transparent'>
               <app-product v-for="item in cart.order_items" :key="item.id" :offer='getOfferById(item.offer_id)'
                  class='app-bg-color-form' />
            </v-list>

            <template v-else>
               <v-list-item-title class='mx-5 pb-1 mt-5 no-item-title text-center'>
                  Немає жодного товару
               </v-list-item-title>

            </template>
            <v-card-actions class="d-flex justify-center pt-0 px-5">
               <v-btn block v-if='cart?.order_items.length' color='orange' class='text-white mx-5 my-5 rounded-lg'
                  @click='goToPayment' variant='flat'>
                  Оформити замовлення
               </v-btn>
               <v-btn v-else block color='orange' class='text-white mx-5 my-5 mt-4 rounded-lg' @click='goToCatalog'
                  variant='flat'>
                  Перейти в каталог
               </v-btn>
            </v-card-actions>
         </v-card>
      </ion-content>
   </ion-modal>
</template>

<script lang='ts' setup>
import AppAddressForm from '@/components/AppAddressForm.vue'
import AppProduct from '@/components/AppProduct.vue'
import { useRouting } from '@/composables'
import { useAddressStore, useCartStore, useOfferStore, useUserStore } from '@/stores'
import { IonContent, IonModal } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
   headerTitle: string
}>()

const offerStore = useOfferStore()
const { getOfferById } = offerStore

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)

const addressStore = useAddressStore()
const { populateAddresses, getUserAddress } = addressStore

const userAddress = ref<string | undefined>()

const routing = useRouting()
const route = useRoute()

const drawer = ref(false)

const menuOverviewItems = [
   { name: 'Про сайт', icon: 'mdi-information-outline', routing: routing.toAbout }
]

const menuAccountItems = [
   { name: 'Налаштування', icon: 'mdi-cog', routing: routing.toSettings },
   { name: 'Вихід', icon: 'mdi-logout-variant', routing: userStore.logout }
]

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
   routing.toOrders()
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
</style>
