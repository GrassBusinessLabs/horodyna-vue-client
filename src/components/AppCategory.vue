<template>
   <v-col cols='12'>
      <v-card
         class='rounded-lg'
         elevation='3'
      >
         <v-img
            :src="category.img"
            height="200px"
            :cover='true'
         ></v-img>

         <v-card-title>
            {{ category.name }}
         </v-card-title>

         <v-card-subtitle class='text-subtitle-1'>
            {{ category.description }}
         </v-card-subtitle>

         <v-card-actions
            class='pa-4'
         >
            <v-btn
               :block='true'
               variant='elevated'
               color="primary"
               @click='setCategory'
            >
               Перейти
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-col>
</template>

<script lang='ts' setup>
import type {Category} from '@/models'
import {useRouting} from '@/composables'
import {useCategoryStore} from '@/stores'

const routing = useRouting()

const props = defineProps<{
   category: Category
}>()

const category = props.category

const categoryStore = useCategoryStore()
const {setCurrentCategory} = categoryStore

const setCategory = async () => {
    setCurrentCategory(category)
    await routing.toProducts()
}

</script>

<style lang='scss' scoped>

</style>
