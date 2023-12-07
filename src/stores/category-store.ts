import {defineStore} from 'pinia'
import {ref, Ref} from 'vue'

type Category = 'Овочі' | 'Фрукти' | `М'ясо` | 'Мед';

export const useCategoryStore = defineStore('category', () => {
   const currentCategory: Ref<Category | null> = ref<Category | null>(null)
   
   function setCurrentCategory(value: Category | null): void {
      currentCategory.value = value
   }
   
   function getCurrentCategory(): Category | null {
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
