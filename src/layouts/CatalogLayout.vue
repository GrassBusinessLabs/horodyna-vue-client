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

         <v-container>
                  <v-sheet
                     class='pa-1'
                     min-height='70vh'
                     rounded='lg'
                     color='indigo-accent-2'
                  >
                     <slot />
                  </v-sheet>
         </v-container>
      </v-main>
   </v-layout>
</template>

<script lang='ts' setup>
import AppHeader from '@/components/AppHeader.vue'

// import {storeToRefs} from 'pinia'
// import {useAppI18n} from '@/i18n'
// import {useUserStore} from '@/stores'

// const userStore = useUserStore()

// const {translate} = useAppI18n()
// const {logout} = userStore

</script>

<style lang='scss' scoped>
.card-title {
   font-size: 1rem;
}
</style>

