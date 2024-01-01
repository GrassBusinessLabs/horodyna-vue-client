import {defineStore} from 'pinia'
import {ref, Ref} from 'vue'
import {Farm} from '@/models'
import {requestService} from '@/services'
import {useHandleError} from '@/composables'

export const useFarmStore = defineStore('farm', () => {
   const {handleError} = useHandleError()
   const request = requestService()
   const farms: Ref<Farm[] | null> = ref<Farm[] | null>(null)
   
   function setFarms(value: Farm[] | null): void {
      farms.value = value
   }
   
   async function getFarmsData(): Promise<void> {
      try {
         const farmsData: Farm[] = await request.getFarms()
         setFarms(farmsData.items)
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }
   
   async function populateFarms(): Promise<void> {
      try {
         await getFarmsData()
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }
   
   return {
      farms,
      populateFarms
   }
})
