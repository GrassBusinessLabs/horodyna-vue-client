import {defineStore} from 'pinia'
import {ref, Ref} from 'vue'
import {requestService} from '@/services'
import {useHandleError} from '@/composables'
import { Offer, OfferResponse } from '@/models'

export const useOfferStore = defineStore('offer', () => {
   const {handleError} = useHandleError()
   const request = requestService()
   const offers: Ref<Offer[] | null> = ref<Offer[] | null>(null)
   
   function setOffers(value: Offer[] | null): void {
      offers.value = value
   }
   
   async function getOffers(): Promise<void> {
      try {
         const offers: OfferResponse = await request.getOffers()
         setOffers(offers.items)
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }
   
   async function populateOffers(): Promise<void> {
      try {
         await getOffers()
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }
   
   return {
      offers,
      populateOffers
   }
})
