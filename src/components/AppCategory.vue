<template>
   <v-col cols='1'
      style="position: sticky; top: 0;"
      class='pa-2 pr-1'
      v-if='filteredProducts.length !== 0'
   >
      <div class='letter-block rounded-lg d-flex justify-center align-center app-color'>
         {{ letter }}
      </div>
   </v-col>

   <v-col
      cols='11'
      class='pl-2 pr-0 pt-6'
      v-if='filteredProducts.length !== 0'
      :class="[letter, isFirst ? 'pt-9' : '']"
   >
   <v-list class='mt-2 bg-transparent'>
         <v-list-item
            v-for="product in filteredProducts"
            :key="product.id"
            @click='setCategory(product.name)'
            class='pa-3 rounded-xl mb-3 app-item-color'
         >
            <template v-slot:prepend>
               <v-avatar size="40" :image="product.img"></v-avatar>
            </template>
            <v-list-item-title class='my-font-size my-color'>
               {{ product.name }}
            </v-list-item-title>
            <v-list-item-subtitle class='my-subtitle-fs my-color'>
               {{ product.category }}
            </v-list-item-subtitle>
         </v-list-item>
      </v-list>
   </v-col>
</template>

<script lang='ts' setup>
import { useRouting } from '@/composables'
import { productsData } from '@/constants/products.ts'
import { useCategoryStore } from '@/stores'

const props = defineProps<{
   letter: string,
   isFirst: boolean
}>()

const routing = useRouting()

const filteredProducts = productsData.filter((product) => props.letter === product.name[0])
   .sort((a, b) => a.name.localeCompare(b.name))

const categoryStore = useCategoryStore()
const {setCurrentCategory} = categoryStore

const setCategory = async (name: string) => {
   setCurrentCategory(name)
   await routing.toProducts()
}

</script>

<style lang='scss' scoped>
v-col {
   padding: 0;
}

.letter-block {
   height: 23px;
   width: 23px;
   font-size: 13px;
}

.v-avatar {
   border-radius: 15px;
}

.app-item-color {
   padding-left: 13px !important;
}
</style>
