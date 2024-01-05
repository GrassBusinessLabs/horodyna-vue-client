<template>
   <v-navigation-drawer
      v-model='drawer'
      :temporary='true'
      class='position-fixed'
      width='290'
   >
      <v-list-item
         prepend-avatar='https://randomuser.me/api/portraits/men/78.jpg'
         class='my-padding'
      >
         <v-list-item-title class='my-subtitle app-font-regular'>{{ currentUser?.user.name }}</v-list-item-title>
         <v-list-item-subtitle class='my-font-size'>{{ currentUser?.user.email }}</v-list-item-subtitle>
         <template v-slot:append>
            <v-icon size='27' icon="mdi-chevron-left" @click='drawer = false'></v-icon>
         </template>
      </v-list-item>
      <v-divider thickness='2'></v-divider>

      <v-list density='compact' :nav='true' class='mt-2'>
         <v-list-item-subtitle class='my-font-size ml-2 mb-2 mt-1'>
            ОГЛЯД
         </v-list-item-subtitle>
         <v-list-item
            v-for="item in menuOverviewItems"
            :key="item.name"
            @click="item.routing"
            class='pl-0 pt-0 mb-0'
         >
            <template v-slot:prepend>
               <v-icon size='27' icon="mdi-chevron-right"></v-icon>
               <v-icon class='mx-1' :icon='item.icon'></v-icon>
               <p class='my-font-size ml-2'>{{ item.name }}</p>
            </template>
         </v-list-item>
      </v-list>
      <v-list density='compact' :nav='true' class='mt-2'>
         <v-list-item-subtitle class='my-font-size ml-2 mb-2 mt-1'>
            АККАУНТ
         </v-list-item-subtitle>
         <v-list-item
            v-for="item in menuAccountItems"
            :key="item.name"
            @click="item.routing"
            class='pl-0 pt-0 mb-0'
         >
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
         <v-container class='d-flex'>
            <v-btn
               v-if="route.path !== '/sign-in' && route.path !== '/register' && route.path !== '/password-change'"
               class='pa-0 w-auto h-auto mr-4'
               icon='mdi-menu'
               @click.stop='drawer = !drawer'
            >
            </v-btn>
            <v-app-bar-title>{{ headerTitle }}</v-app-bar-title>
         </v-container>
      </template>
      <template v-slot:append>
         <v-btn icon='mdi-cart' @click='sheet = !sheet' v-if="route.path !== '/sign-in' && route.path !== '/register' && route.path !== '/password-change'">
            <v-badge :content='cartStore.getCartLength()' overlap>
               <v-icon>mdi-cart</v-icon>
            </v-badge>
         </v-btn>
      </template>
   </v-app-bar>
   <v-bottom-sheet v-model='sheet'>
      <v-card
         height='586'
         class='pa-0 rounded-t-lg app-item-color'
      >
         <v-card-title class='py-4 text-center my-border my-title'>
            Кошик
            <v-list-item-subtitle
               v-if='cartStore.getCartLength() !== 0'
               class='my-subtitle pt-2 pb-1'
            >
               Сума: {{ cartStore.getTotalSum() }}.00 грн
            </v-list-item-subtitle>
         </v-card-title>

         <v-list
            v-if='cartStore.getCartLength() !== 0'
            class='pa-5 pb-0 bg-transparent'
         >
            <app-product
               v-for="product in cartStore.basket"
               :key="product.id"
               :product='product'
               class='app-bg-color-form'
            />
         </v-list>
         <v-btn
            v-if='cartStore.getCartLength() !== 0'
            color='orange'
            class='text-white mx-5 my-5'
            @click='routing.toPayment'
            variant='flat'
         >
            Оформити замовлення
         </v-btn>
         <template v-else>
            <v-list-item-title
               class='mx-5 pt-5 pb-2 mt-7 no-item-title text-center'
            >
               Немає жодного товару
            </v-list-item-title>
            <v-btn
               color='orange'
               class='text-white mx-5 my-5'
               @click='goToCatalog'
               variant='flat'
            >
               Перейти в каталог
            </v-btn>
         </template>
      </v-card>
   </v-bottom-sheet>
</template>

<script lang='ts' setup>
import {useRouting} from '@/composables'
import {useRoute} from 'vue-router'
import {ref} from 'vue'

import {productStore} from '@/stores/product-store.ts'
import AppProduct from '@/components/AppProduct.vue'
import {storeToRefs} from 'pinia'
import {useUserStore} from '@/stores'

defineProps<{
   headerTitle: string
}>()

const userStore = useUserStore()
const {currentUser} = storeToRefs(userStore)

const cartStore = productStore()

const routing = useRouting()
const route = useRoute()

const drawer = ref(false)

const menuOverviewItems = [
   {name: 'Замовлення', icon: 'mdi-wallet-bifold-outline', routing: routing.toOrders},
   {name: 'Про сайт', icon: 'mdi-information-outline', routing: routing.toAbout}
]

const menuAccountItems = [
   {name: 'Налаштування', icon: 'mdi-cog', routing: routing.toSettings},
   {name: 'Вихід', icon: 'mdi-logout-variant', routing: userStore.logout}
]

const sheet = ref(false)

const goToCatalog = () => {
   sheet.value = false
   routing.toCatalog()
}
</script>

<style lang='scss' scoped>
.my-padding {
   padding: 11.6px;
}

.v-app-bar {
   background-color: #6168DB;
}

.no-item-title {
   font-size: 33px;
}
</style>
