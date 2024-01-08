import { CreateOrder, CreateOrderItem, DeleteOrderItem, Offer, Order, UpdateOrderItem } from '@/models'
import {defineStore} from 'pinia'
import {ref, Ref} from 'vue'
import { useOrderStore } from './order-store'
import { requestService } from '@/services'

export const useCartStore = defineStore('cart', () => {
   const request = requestService()
   const orderStore = useOrderStore()
   const {populateOrders, getDraftOrder} = orderStore

   const cart: Ref<Order | null> = ref<Order | null>(null)
   
   function setCart(): void {
      cart.value = getDraftOrder()
   }

   async function addProductToCart(offer: Offer) {
      setCart() 
      if(cart.value) {
         const selectedProduct = cart.value.order_items.find(item => item.offer_id === offer.id)
         if(selectedProduct) {
            const body: UpdateOrderItem = {
               id: selectedProduct.id,
               amount: selectedProduct.amount + 1
            }
            await request.updateOrderItem(body)
            await populateOrders()
            setCart()
            
         } else {
            const body: CreateOrderItem = {
               id: cart.value.id,
               offer_id: offer.id,
               amount: 1
            }
            await request.createOrderItem(body)
            await populateOrders()
            setCart()
         }
      } else {
         const body: CreateOrder = {
         order_items: [
         {
            offer_id: offer.id,
            amount: 1
         }
         ],
         address_id: 1,
         comment: '',
         shipping_price: 0
      }
   
      await request.createOrder(body)
      }
   }

   async function removeProductFromCart(offer: Offer) {
      setCart() 
      const selectedProduct = cart.value.order_items.find(item => item.offer_id === offer.id)
      if (selectedProduct && selectedProduct.amount !== 1) {
         const body: UpdateOrderItem = {
            id: selectedProduct.id,
            amount: selectedProduct.amount - 1
         }
         await request.updateOrderItem(body)
         await populateOrders()
         setCart()
      } else {
         const body: DeleteOrderItem = {
            id: selectedProduct?.id,
         }
         await request.deleteOrderItem(body)
         await populateOrders()
         setCart()
      }
   }

   return {
      cart,
      setCart,
      addProductToCart,
      removeProductFromCart
   }
})
