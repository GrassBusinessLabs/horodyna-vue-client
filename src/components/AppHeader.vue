<template>
   <v-navigation-drawer v-model='drawer' :temporary='true' class='position-fixed' width='290'>
      <v-list-item class='my-padding pl-4 pb-2'>
         <v-list-item-title class='user-name app-font-regular'>{{ currentUser?.name }}</v-list-item-title>
         <app-address-form :user-address="userAddress" :is-menu-button="true"
            @close-menu="drawer = false"></app-address-form>
      </v-list-item>
      <v-divider thickness='2'></v-divider>

      <!-- <v-list density='compact' :nav='true' class='mt-2'>
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
</v-list> -->
      <v-list density='compact' :nav='true' class='pt-1'>
         <v-list-item-subtitle class='my-font-size ml-2 mb-2 mt-3'>
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
   <v-app-bar class='position-fixed text-white d-flex justify-center' elevation='0'>
      <v-container class='d-flex pl-3'>
         <!-- <v-btn
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
            <v-btn v-if="route.path === '/password-change'" class='pa-0 w-auto h-auto mr-4' icon='mdi-arrow-left'
               @click='routing.toCatalog'>
            </v-btn> -->
         <v-app-bar-title class="ml-3" :class="{'ml-11': route.path === '/products'}">{{ headerTitle }}</v-app-bar-title>
      </v-container>
      <template v-slot:append>
         <svg v-if="route.path === '/products'" @click='routing.toCatalog' class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_30_898)">
               <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="white" />
            </g>
            <defs>
               <clipPath id="clip0_30_898">
                  <rect width="24" height="24" fill="white" />
               </clipPath>
            </defs>
         </svg>
      </template>
      <!-- <template v-slot:append>
         <v-btn icon='mdi-cart' @click='isOpen = !isOpen'
            v-if="route.path !== '/sign-in' && route.path !== '/register' && route.path !== '/password-change' && route.path !== '/admin-panel' && route.path !== '/payment' && route.path !== '/orders'">
            <v-badge v-if="cart?.order_items.length" color="grey-darken-4"
               :content='cart?.order_items.length ? cart?.order_items.length : 0'>
               <v-icon>mdi-cart</v-icon>
            </v-badge>
            <v-icon v-else class="ml-2">mdi-cart</v-icon>
         </v-btn>
      </template> -->
   </v-app-bar>

   <ion-modal :is-open="isOpen" @ionModalDidDismiss="modalDismissed" :handle="false" :initial-breakpoint="1"
      :breakpoints="[0, 1]">
      <v-card height='604' class='pa-0 rounded-t-lg app-item-color'>
         <v-card-title class='py-4 text-center my-border my-title'>
            Кошик
            <v-list-item-subtitle v-if='cart?.order_items.length' class='my-subtitle py-1'>
               Сума: {{ cart?.product_price }} грн
            </v-list-item-subtitle>
         </v-card-title>

         <v-list v-if='cart?.order_items.length' @touchmove.stop max-height="407"
            class='pa-5 pb-0 bg-transparent pt-0 mt-5'>
            <app-product v-for="item in cart.order_items" :key="item.id" :offer='item.offer'
               class='app-bg-color-form' />
         </v-list>

         <template v-else>
            <div class="d-flex mt-5">
               <img width='40%' class="cart-image" src='https://cdn-icons-png.flaticon.com/512/5102/5102639.png'>
            </div>
            <v-list-item-title class='mx-5 pb-1 no-item-title text-center'>
               Немає жодного товару
            </v-list-item-title>
         </template>
         <v-card-actions @touchmove.stop class="d-flex justify-center pt-0 px-5">
            <v-btn block v-if='cart?.order_items.length' color='orange' class='text-white mx-5 my-5 rounded-lg btn-text'
               @click='goToPayment' variant='flat'>
               Оформити замовлення
            </v-btn>
            <v-btn v-else block class='text-white mx-5 my-5 mt-4 rounded-lg app-color btn-text' @click='goToCatalog'
               variant='flat'>
               Перейти в каталог
            </v-btn>
         </v-card-actions>
      </v-card>
   </ion-modal>
</template>

<script lang='ts' setup>
import AppAddressForm from '@/components/AppAddressForm.vue'
import AppProduct from '@/components/AppProduct.vue'
import { useRouting } from '@/composables'
import { Address } from '@/models'
import { requestService } from '@/services'
import { useCartStore, useUserStore } from '@/stores'
import { IonModal } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
   headerTitle: string
}>()

const request = requestService()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)

const userAddress = ref<Address | undefined>()

const routing = useRouting()
const route = useRoute()

const drawer = ref(false)

const menuOverviewItems = [
   { name: 'Про сайт', icon: 'mdi-information-outline', routing: routing.toAbout }
]

const menuAccountItems = [
   // { name: 'Налаштування', icon: 'mdi-cog', routing: routing.toSettings },
   { name: 'Змінити пароль', icon: 'mdi-cog', routing: routing.toPasswordChange },
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
      try {
         const userAddressResponse = await request.getAddressByUserId(currentUser.value?.id ? currentUser.value.id : -1)
         userAddress.value = userAddressResponse ? userAddressResponse : undefined
      } catch (e) {
         userAddress.value = undefined
      }
   }
})
</script>

<style lang='scss' scoped>
.my-padding {
   padding: 11.6px;
   padding-top: 9.5px;
}

.v-app-bar {
   background: var(--color-primary);
   height: 65px;
}

.v-app-bar-title {
   font-family: var(--font-family);
   font-weight: 600;
   font-size: 18px;
   line-height: 150%;
   letter-spacing: -0.01em;
   text-align: center;
   color: var(--color-white);
}

.no-item-title {
   font-size: 28px;
   white-space: normal;
   line-height: 1;
   margin-top: 14px;
}

.user-name {
   font-size: 19px;
}

.cart-image {
   margin: 0 auto;
}

.v-card-actions {
   position: fixed;
   bottom: -7px;
   right: 0px;
   left: 0px;
}
</style>
