<template>
   <v-layout class='rounded rounded-md'>
      <app-header :header-title="'Категорії продуктів'" />

      <v-main>
<!--         <v-btn-->
<!--            class='mt-2'-->
<!--            :block='true'-->
<!--            type='button'-->
<!--            variant='text'-->
<!--            @click='logout'-->
<!--         >-->
<!--            {{ translate('BTNS.LOGOUT') }}-->
<!--         </v-btn>-->
         <v-container class='py-5 pl-8'>
            <v-row>
               <slot />
            </v-row>
         </v-container>
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'

// import {useAppI18n} from '@/i18n'
// import {useUserStore} from '@/stores'
//
// const userStore = useUserStore()
//
// const {translate} = useAppI18n()
// const {logout} = userStore

</script>

<style lang='scss' scoped>
.card-title {
   font-size: 1rem;
}

.v-container {
   height: 100vh;
   width: 100%;
   overflow: auto;
}
</style>

