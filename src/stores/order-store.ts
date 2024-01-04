import {defineStore} from 'pinia'
import {ref, Ref} from 'vue'
import {Order} from '@/models'
import {requestService} from '@/services'
import {useHandleError} from '@/composables'

export const useOrderStore = defineStore('order', () => {
   const {handleError} = useHandleError()
   const request = requestService()
   const orders: Ref<Order[] | null> = ref<Order[] | null>(null)
   
   function setOrders(value: Order[] | null): void {
      orders.value = value
   }
   
   async function getOrders(): Promise<void> {
      try {
         const orders: Order[] = await request.getOrders()
         setOrders(orders)
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }
   
   async function populateOrders(): Promise<void> {
      try {
         await getOrders()
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }
   
   return {
      orders,
      populateOrders
   }
})
