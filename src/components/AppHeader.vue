<template>
   <v-navigation-drawer
      v-model='drawer'
      :temporary='true'
      class='position-fixed'
   >
      <v-list-item
         prepend-avatar='https://randomuser.me/api/portraits/men/78.jpg'
         class='my-padding'
      >
         <v-list-item-title class='text-h6'>User Name</v-list-item-title>
         <v-list-item-subtitle class='text-subtitle-1'>sa@test.com</v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density='compact' :nav='true'>
         <v-list-item @click='routing.toSettings'>
            <template v-slot:prepend>
               <v-icon icon='mdi mdi-cog'></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Налаштування</v-list-item-title>
            </template>
         </v-list-item>
         <v-list-item @click='routing.toSettings'>
            <template v-slot:prepend>
               <v-icon icon='mdi-face-agent'></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Підтримка</v-list-item-title>
            </template>
         </v-list-item>
         <v-list-item @click='routing.toAbout'>
            <template v-slot:prepend>
               <v-icon icon='mdi-information-outline'></v-icon>
               <v-list-item-title class='text-subtitle-1 ml-2'>Про сайт</v-list-item-title>
            </template>
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
   <v-app-bar class='position-fixed' color='primary'>
      <template v-slot:prepend>
         <v-container class='d-flex'>
            <v-btn
               v-if="route.path !== '/sign-in'"
               class='pa-0 w-auto h-auto mr-4'
               icon='mdi mdi-menu'
               @click.stop='drawer = !drawer'
            >
            </v-btn>
            <v-app-bar-title>{{ headerTitle }}</v-app-bar-title>
         </v-container>
      </template>
      <template v-slot:append>
         <v-btn icon='mdi-cart' @click='sheet = !sheet' v-if="route.path !== '/sign-in'">
            <v-badge :content='cartStore.getCartLength()' overlap>
               <v-icon>mdi-cart</v-icon>
            </v-badge>
         </v-btn>
      </template>
   </v-app-bar>
   <v-bottom-sheet v-model='sheet'>
      <v-card
         height='570'
         class='pa-0 rounded-t-lg'
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
            class='pa-5 pb-0'
         >
            <v-list-item
               class='pa-4 bg-grey-lighten-4 rounded-xl product-item'
               v-for="product in cartStore.basket"
               :key="product.productId"
            >
               <template v-slot:prepend>
                  <v-avatar size="95" :image="product.img" class='mx-1'></v-avatar>
               </template>

               <v-list-item-title class='my-font-size'>
                  {{ product.name }}
               </v-list-item-title>
               <v-list-item-subtitle class='text-subtitle-1 pt-2'>
                  Продавець: {{ product.author }}
               </v-list-item-subtitle>
               <v-list-item-subtitle class='text-subtitle-1 py-2'>
                  Адреса: {{ product.address }}
               </v-list-item-subtitle>
               <v-list-item-title class='my-color my-font-size'>
                  Ціна: {{ product.price }}.00 грн
               </v-list-item-title>

               <template v-slot:append>
                  <v-container class='pa-0 d-flex flex-column'>
                     <v-icon
                        icon="mdi-minus-circle-outline"
                        size='32'
                        class='text-grey-darken-1'
                        @click='cartStore.decreaseProductQuantity(product)'
                     ></v-icon>
                     <v-list-item-subtitle
                        class='my-item-subtitle py-4 font-weight-bold text-center text-grey-darken-4'
                     >
                        {{ cartStore.getCurrentProductQuantity(product) ? cartStore.getCurrentProductQuantity(product) : 0 }}
                     </v-list-item-subtitle>
                     <v-icon
                        icon="mdi-plus-circle-outline"
                        size='32'
                        class='text-grey-darken-1'
                        @click='addProduct(product)'
                     ></v-icon>
                  </v-container>
               </template>
            </v-list-item>
         </v-list>
         <v-btn
            v-if='cartStore.getCartLength() !== 0'
            color='orange'
            class='text-white mx-5 my-5 text-h6'
            @click='routing.toPayment'
         >
            Оформити замовлення
         </v-btn>
         <template v-else>
            <v-list-item-title
            class='mx-5 pt-5 pb-2 mt-7 text-h4 text-center'
         >
            Немає жодного товару
         </v-list-item-title>
            <v-btn
               color='orange'
               class='text-white mx-5 my-5 text-h6'
               @click='goToCatalog'
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
import {Product} from '@/models'

defineProps<{
   headerTitle: string
}>()

const cartStore = productStore();

const drawer = ref(false)

const routing = useRouting()
const route = useRoute()

const sheet = ref(false)

const addProduct = (product: Product) => {
   cartStore.addProductToCart({
      ...product,
      selectedQuantity: 1,
      sum: product.price
   })
}

const goToCatalog = () => {
   sheet.value = false
   routing.toCatalog()
}
</script>

<style lang='scss' scoped>
.my-padding {
   padding: 11.6px;
}
</style>
