import { useHandleError } from '@/composables'
import { Order, OrderById, OrderResponse } from '@/models'
import { requestService } from '@/services'
import { defineStore, storeToRefs } from 'pinia'
import { Ref, ref } from 'vue'
import { useCartStore } from './cart-store'

export const useOrderStore = defineStore('order', () => {
   const {handleError} = useHandleError()
   const request = requestService()
   const orders: Ref<Order[] | null> = ref<Order[] | null>(null)
   const selectedOrder: Ref<OrderById | null> = ref<OrderById | null>(null)
   
   function setOrders(value: Order[] | null): void {
      orders.value = value
   }

   function setSelectedOrder(value: OrderById | null): void {
      selectedOrder.value = value
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

   function getActiveOrders(): Order[] | null {
      return orders.value ? orders.value.filter(order => order.status !== 'COMPLETED' && order.status !== 'DRAFT' && order.status !== 'DECLINED') : null
   }

   function getCompletedOrders(): Order[] | null {
      return orders.value ? orders.value.filter(order => order.status === 'COMPLETED') : null
   }

   function getDeclinedOrders(): Order[] | null {
      return orders.value ? orders.value.filter(order => order.status === 'DECLINED') : null
   }

   function getProductAmount(id: number): number | 0 {
      const cartStore = useCartStore()
      const {cart} = storeToRefs(cartStore)
      
      const cartProduct = cart.value?.order_items.find(item => item.offer_id === id)
      return cartProduct ? cartProduct.amount : 0
   }
   
   return {
      orders,
      selectedOrder,
      populateOrders,
      getDraftOrder,
      getActiveOrders,
      getCompletedOrders,
      getDeclinedOrders,
      getProductAmount,
      setSelectedOrder
   }
})