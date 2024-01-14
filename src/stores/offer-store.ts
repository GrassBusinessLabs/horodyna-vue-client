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

   function getOfferById(id: number): Offer {
      const findedOffer = offers.value ? offers.value.find(offer => offer.id === id) : null
      return findedOffer ? findedOffer : {
         id: -1,
         title: '',
         description: '',
         category: '',
         price: -1,
         unit: '',
         stock: -1,
         status: false,
         image: '',
         user: {
            id: -1,
            name: '',
            email: ''
        },
         farm_id: -1
      }
   }

   function getUnprocessedOffers(): Offer[] | null {
      return offers.value ? offers.value.filter(offer => offer.category === 'інше') : null
   }
   
   return {
      offers,
      populateOffers,
      getOfferById,
      getUnprocessedOffers
   }
})
