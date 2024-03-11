import { useHandleError } from '@/composables'
import { Farm, FarmResponse } from '@/models'
import { requestService } from '@/services'
import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export const useFarmStore = defineStore('farm', () => {
   const {handleError} = useHandleError()
   const request = requestService()
   const farms: Ref<Farm[] | null> = ref<Farm[] | null>(null)
   
   function setFarms(value: Farm[] | null): void {
      farms.value = value
   }
   
   async function getFarmsData(): Promise<void> {
      try {
         const farmsData: FarmResponse = await request.getFarms()
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

   function getFarmAddress(id: number): Farm | null {
      const farm = farms.value?.find(farm => farm.id === id)
      return farm ? farm : null
   }
   
   return {
      farms,
      populateFarms,
      getFarmAddress
   }
})
