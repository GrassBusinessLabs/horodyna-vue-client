import { CreateOrder, CreateOrderItem, Offer, Order, UpdateOrderItem } from '@/models'
import { requestService } from '@/services'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { useOrderStore } from './order-store'

export const useCartStore = defineStore('cart', () => {
   const request = requestService()
   const orderStore = useOrderStore()
   const {populateOrders, getDraftOrder} = orderStore

   const cart: Ref<Order | null> = ref<Order | null>(null)
   const selectedOffer: Ref<Offer | null> = ref<Offer | null>(null)
   
   function setCart(): void {
      cart.value = getDraftOrder()
   }

   async function addProductToCart(offer: Offer) {
      // setCart() 
      // if(cart.value) {
      //    const selectedProduct = cart.value.order_items.find(item => item.offer_id === offer.id)
      //    if(selectedProduct) {
      //       const body: UpdateOrderItem = {
      //          id: selectedProduct.id,
      //          amount: selectedProduct.amount + 1
      //       }
      //       await request.updateOrderItem(body)
      //       await populateOrders()
      //       setCart()
      //    } else {
      //       const body: CreateOrderItem = {
      //          id: cart.value.id,
      //          offer_id: offer.id,
      //          amount: 1
      //       }
      //       await request.createOrderItem(body)
      //       await populateOrders()
      //       setCart()
      //    }
      // } else {
      //    const body: CreateOrder = {
      //    order_items: [
      //    {
      //       offer_id: offer.id,
      //       amount: 1
      //    }
      //    ],
      //    address_id: 1,
      //    comment: '',
      //    shipping_price: 0
      // }
      // await request.createOrder(body)
      // await populateOrders()
      // setCart()
      // }
   }

   async function removeProductFromCart(offer: Offer) {
      // setCart() 
      // const selectedProduct = cart.value?.order_items.find(item => item.offer_id === offer.id)
      // if (selectedProduct && selectedProduct.amount !== 1) {
      //    const body: UpdateOrderItem = {
      //       id: selectedProduct.id,
      //       amount: selectedProduct.amount - 1
      //    }
      //    await request.updateOrderItem(body)
      //    await populateOrders()
      //    setCart()
      // } else {
      //    await request.deleteOrderItem(selectedProduct?.id)
      //    await populateOrders()
      //    setCart()
      // }
   }

   function setSelectedOffer(value: Offer | null): void {
      selectedOffer.value = value
   }

   return {
      cart,
      selectedOffer,
      setCart,
      addProductToCart,
      removeProductFromCart,
      setSelectedOffer
   }
})