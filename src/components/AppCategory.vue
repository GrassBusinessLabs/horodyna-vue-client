<template>
   <v-col cols='1' style="position: sticky; top: 0;" class='pa-2 pr-1' v-if='filteredProducts.length !== 0'>
      <div class='letter-block d-flex justify-center align-center'>
         {{ letter }}
      </div>
   </v-col>

   <v-col cols='11' class='pl-2 pr-0 pt-6' v-if='filteredProducts.length !== 0'
      :class="[letter, isFirst ? 'pt-9' : '']">
      <v-list class='mt-2 bg-transparent'>
         <div v-for="product in filteredProducts" :key="product.id" @click='setCategory(product.name)'
            class='mb-3 app-item-color category-block d-flex'>
            <div>
               <v-avatar size="38" :image="product.img"></v-avatar>
            </div>
            <div class="category-text">
               <v-list-item-title>
               {{ product.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="category">
               {{ product.category }}
            </v-list-item-subtitle>
            </div>
         </div>
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
const { setCurrentCategory } = categoryStore

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
   font-size: 12px;
   background: var(--color-primary);
   color: white;
   border-radius: 6px;
}

.v-avatar {
   border-radius: 12px;
}

.category-block {
   padding: 11px 12px 10px 11px !important;
   border-radius: 18px;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
}

.v-list-item-title {
   font-family: var(--font-family);
   font-weight: 400;
   font-size: 16px;
   line-height: 120%;
   color: var(--color-dark);
   margin-top: 2px;
}

.category-text {
   margin-left: 9px;
}

.category {
   font-weight: 400;
   font-size: 15px;
   color: var(--color-light);
   opacity: 100%;
}
</style>
