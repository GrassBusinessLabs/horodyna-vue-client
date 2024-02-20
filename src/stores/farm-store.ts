import {defineStore} from 'pinia'
import {ref, Ref} from 'vue'
import {Farm, FarmResponse} from '@/models'
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

   function getFarmAddress(id: number): string {
      const farm = farms.value?.find(farm => farm.id === id)
      return farm ? farm.address : 'Farm not found'
   }
   
   return {
      farms,
      populateFarms,
      getFarmAddress
   }
})
