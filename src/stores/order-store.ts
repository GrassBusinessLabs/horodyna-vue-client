import {defineStore} from 'pinia'
import {ref, Ref} from 'vue'
import {Order, OrderResponse} from '@/models'
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
         const orders: OrderResponse = await request.getOrders()
         setOrders(orders.items)
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

   function getDraftOrder(): Order | null {
      const draftOrder = orders.value ? orders.value.find(order => order.status === 'DRAFT') : null
      return draftOrder ? draftOrder : null
   }    

   function getSubmittedOrders(): Order[] | null {
      return orders.value ? orders.value.filter(order => order.status === 'SUBMITTED') : null
   }

   function getCompletedOrders(): Order[] | null {
      return orders.value ? orders.value.filter(order => order.status === 'COMPLETED') : null
   }

   function getProductAmount(id: number): number | 0 {
      const cart = getDraftOrder()
      const cartProduct = cart?.order_items.find(item => item.offer_id === id)
      return cartProduct ? cartProduct.amount : 0
   }
   
   return {
      orders,
      populateOrders,
      getDraftOrder,
      getSubmittedOrders,
      getCompletedOrders,
      getProductAmount
   }
})
