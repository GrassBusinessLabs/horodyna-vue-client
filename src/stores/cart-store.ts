import { CreateOrder, CreateOrderItem, Offer, OrderById, UpdateOrderItem } from '@/models'
import { requestService } from '@/services'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { useOrderStore } from './order-store'

export const useCartStore = defineStore('cart', () => {
   const request = requestService()
   const orderStore = useOrderStore()
   const {populateOrders, getDraftOrder} = orderStore

   const cart: Ref<OrderById | null> = ref<OrderById | null>(null)
   const selectedOffer: Ref<Offer | null> = ref<Offer | null>(null)
   
   async function setCart(): Promise<void> {
      const draftOrder = getDraftOrder()
      if(draftOrder) {
         const orderResponse = await request.getOrderById(draftOrder.id)
         cart.value = orderResponse
      } else {
         const body: CreateOrder = {
         order_items: [],
         address: {
            user_id: 1,
            title: 'Cart',
            city: "City",
            country: 'Country',
            address: 'Address',
            lat: 1,
            lon: 1
         },
         comment: '',
         shipping_price: 0
      }
      await request.createOrder(body)
      await populateOrders()
      await setCart()
      }
   }

   async function addProductToCart(offer: Offer) {
      await setCart()
      const selectedProduct = cart.value?.order_items.find(item => item.offer_id === offer.id)
      if (selectedProduct) {
         const body: UpdateOrderItem = {
            id: selectedProduct.id,
            amount: selectedProduct.amount + 1
         }
         await request.updateOrderItem(body)
         await populateOrders()
         await setCart()
      } else {
         const body: CreateOrderItem = {
            id: cart.value?.id,
            offer_id: offer.id,
            amount: 1
         }
         await request.createOrderItem(body)
         await populateOrders()
         await setCart()
      }
   }

   async function removeProductFromCart(offer: Offer) {
      await setCart() 
      const selectedProduct = cart.value?.order_items.find(item => item.offer_id === offer.id)
      if (selectedProduct && selectedProduct.amount > 1) {
         const body: UpdateOrderItem = {
            id: selectedProduct.id,
            amount: selectedProduct.amount - 1
         }
         await request.updateOrderItem(body)
         await populateOrders()
         await setCart()
      } else {
         await request.deleteOrderItem(selectedProduct?.id ? selectedProduct?.id : -1)
         await populateOrders()
         await setCart()
      }
   }

   function setSelectedOffer(value: Offer | null): void {
      selectedOffer.value = value
   }

   function resetSelectedOffer(): void {
      selectedOffer.value = null
   }

   return {
      cart,
      selectedOffer,
      setCart,
      addProductToCart,
      removeProductFromCart,
      setSelectedOffer,
      resetSelectedOffer
   }
})
