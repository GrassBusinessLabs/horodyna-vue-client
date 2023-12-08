import {defineStore} from 'pinia'
import {ref, Ref} from 'vue'

export const useCategoryStore = defineStore('category', () => {
   const currentCategory: Ref<string | null> = ref<string | null>(null)
   
   function setCurrentCategory(value: string | null): void {
      currentCategory.value = value
   }
   
   function getCurrentCategory(): string | null {
      if(currentCategory.value) {
         return currentCategory.value
      }
      return null
   }
   
   return {
      setCurrentCategory,
      getCurrentCategory
   }
})
