<template>
   <v-bottom-navigation v-model="number" :grow='true' class='my-min-height' elevation='0'>
      <v-btn @click='routing.toCatalog'>
         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9H28M10 16H28M10 23H28" stroke="#EDEDED" stroke-width="1.5" stroke-linecap="round"
               stroke-linejoin="round" />
            <path
               d="M5 10C5.55228 10 6 9.55228 6 9C6 8.44772 5.55228 8 5 8C4.44772 8 4 8.44772 4 9C4 9.55228 4.44772 10 5 10Z"
               stroke="#EDEDED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
               d="M5 17C5.55228 17 6 16.5523 6 16C6 15.4477 5.55228 15 5 15C4.44772 15 4 15.4477 4 16C4 16.5523 4.44772 17 5 17Z"
               stroke="#EDEDED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
               d="M5 24C5.55228 24 6 23.5523 6 23C6 22.4477 5.55228 22 5 22C4.44772 22 4 22.4477 4 23C4 23.5523 4.44772 24 5 24Z"
               stroke="#EDEDED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         <span>Каталог</span>
      </v-btn>

      <v-btn @click='routing.toMap'>
         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M20.5 8.00007V29.0001M11.5 3.00007V24.0001M19.5794 7.79007L12.4206 3.21007C12.1359 3.06783 11.8213 2.99561 11.503 2.99941C11.1847 3.00322 10.8719 3.08294 10.5906 3.23195L3.53187 7.9682C3.37128 8.05327 3.23691 8.1805 3.1432 8.33621C3.04949 8.49191 2.99998 8.67022 3 8.85195V27.3394C2.99998 27.5119 3.04457 27.6814 3.12942 27.8316C3.21428 27.9817 3.33652 28.1073 3.48427 28.1963C3.63202 28.2852 3.80027 28.3344 3.97266 28.3392C4.14505 28.3439 4.31573 28.3039 4.46812 28.2232L10.5819 24.2363C10.8654 24.0861 11.181 24.0063 11.5019 24.0037C11.8228 24.0011 12.1396 24.0757 12.4256 24.2213L19.4169 28.7838C19.7004 28.9283 20.0142 29.003 20.3324 29.0018C20.6506 29.0006 20.9639 28.9235 21.2463 28.777L28.4606 24.0307C28.6232 23.9463 28.7594 23.819 28.8546 23.6625C28.9497 23.506 29 23.3263 29 23.1432V4.6607C29 4.48824 28.9554 4.31871 28.8706 4.16857C28.7857 4.01844 28.6635 3.8928 28.5157 3.80386C28.368 3.71492 28.1997 3.6657 28.0273 3.66098C27.8549 3.65627 27.6843 3.69622 27.5319 3.77695L21.4069 7.7682C21.1259 7.91679 20.8136 7.99629 20.4958 8.00009C20.178 8.00389 19.8638 7.9319 19.5794 7.79007Z"
               stroke="#EDEDED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         <span>Карта</span>
      </v-btn>

      <v-btn @click='routing.toPurchases'>
         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M20.125 26C20.125 28.2094 18.8344 30 16.625 30H8.375C6.16563 30 4.875 28.2094 4.875 26M21 21C22.1044 21 23 22.1194 23 23.5C23 24.8806 22.1044 26 21 26H4C2.89562 26 2 24.8806 2 23.5C2 22.1194 2.89562 21 4 21"
               stroke="#EDEDED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
            <path
               d="M4 17.25V17.2363C4 13.7988 6.8125 12 10.25 12H14.75C18.1875 12 21 13.8125 21 17.25V17.2363M15.0625 7L15.5275 10.9981M21.5 21H11.2069C11.0744 21.0001 10.9474 21.0527 10.8538 21.1463L9.17688 22.8231C9.15366 22.8464 9.12609 22.8648 9.09574 22.8774C9.06539 22.89 9.03285 22.8964 9 22.8964C8.96715 22.8964 8.93461 22.89 8.90426 22.8774C8.87391 22.8648 8.84634 22.8464 8.82312 22.8231L7.14625 21.1463C7.05255 21.0527 6.92556 21.0001 6.79313 21H3.5C3.10218 21 2.72064 20.842 2.43934 20.5607C2.15804 20.2794 2 19.8978 2 19.5C2 19.1022 2.15804 18.7206 2.43934 18.4393C2.72064 18.158 3.10218 18 3.5 18H21.5C21.8978 18 22.2794 18.158 22.5607 18.4393C22.842 18.7206 23 19.1022 23 19.5C23 19.8978 22.842 20.2794 22.5607 20.5607C22.2794 20.842 21.8978 21 21.5 21Z"
               stroke="#EDEDED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
            <path
               d="M16 30H24.7069C25.2114 30 25.6974 29.8093 26.0672 29.4661C26.4371 29.1229 26.6636 28.6525 26.7013 28.1494L28.9375 7"
               stroke="#EDEDED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
            <path d="M23 7L24 3L26.9375 2" stroke="#EDEDED" stroke-width="1.5" stroke-linecap="round"
               stroke-linejoin="round" />
            <path d="M14 7H30" stroke="#EDEDED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
         </svg>
         <span>Покупки</span>
      </v-btn>

      <v-btn @click='routing.toCart'>
         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M4 16C3.46957 16 2.96086 16.2107 2.58579 16.5858C2.21071 16.9609 2 17.4696 2 18V20H22V18C22 17.4696 21.7893 16.9609 21.4142 16.5858C21.0391 16.2107 20.5304 16 20 16M4 16H20M4 16C4 13.8783 4.84285 11.8434 6.34315 10.3431C7.84344 8.84285 9.87827 8 12 8M20 16C20 13.8783 19.1571 11.8434 17.6569 10.3431C16.1566 8.84285 14.1217 8 12 8M12 8V4M10 4H14"
               stroke="#EDEDED" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         <span>Кошик</span>
      </v-btn>
   </v-bottom-navigation>
</template>

<script lang='ts' setup>
import { useRouting } from '@/composables'
import { useCartStore, useFarmStore } from '@/stores'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routing = useRouting()

const number = ref(0)

watch(route, () => {
   if (route.path === '/catalog') {
      number.value = 0
   }
   else if (route.path === '/map') {
      number.value = 1
   }
   else if (route.path === '/purchases') {
      number.value = 2
   }
   else if (route.path === '/cart') {
      number.value = 3
   } else {
      number.value = -1
   }
}, { immediate: true })

const farmStore = useFarmStore()
const { populateFarms } = farmStore

populateFarms()

// const orderStore = useOrderStore()
// const {populateOrders} = orderStore

// populateOrders()

const cartStore = useCartStore()
const { setCart } = cartStore

setCart()
</script>

<style lang='scss' scoped>
.my-min-height {
   min-height: 91px;
   border-radius: 8px 8px 0 0;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   background: var(--color-primary);
   color: white;
}

span {
   font-family: var(--font-family);
   font-weight: 600;
   font-size: 12px;
   line-height: 183%;
   text-align: center;
   color: var(--color-lightest);
   margin-top: 5px;
}
</style>
