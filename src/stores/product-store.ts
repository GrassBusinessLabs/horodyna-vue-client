import {defineStore} from 'pinia'
import type {Product} from '@/models'

export const productStore = defineStore("productStore", {
   state: () => ({
      basket: [] as Product[],
      selectedProduct: {} as Product
   }),
   actions: {
      addProductToCart(product: Product) {
         const currentProduct = this.basket.find(item => item.title === product.title)
         
         if (currentProduct?.selectedQuantity) {
            currentProduct.selectedQuantity += 1
         } else {
            this.basket.push(product)
         }
      },
      decreaseProductQuantity(product: Product) {
         const currentProduct = this.basket.find(item => item.title === product.title)
         
         if (currentProduct?.selectedQuantity && currentProduct.selectedQuantity > 1) {
            currentProduct.selectedQuantity -= 1
         } else {
            const index = currentProduct ? this.basket.indexOf(currentProduct) : false
            if (index || index === 0) {
               this.basket.splice(index, 1)
            }
         }
      },
      setSelectedProduct(product: Product) {
         this.selectedProduct = product
      },
      getCurrentProductQuantity (product: Product) {
         const currentProduct = this.basket.find(item => item.title === product.title)
         return currentProduct?.selectedQuantity
      },
      getCartLength(): number {
         return this.basket.length
      },
      getTotalSum(): number {
         return this.basket?.reduce((totalSum, currentProduct) => {
            return totalSum + currentProduct.price * (currentProduct.selectedQuantity ? currentProduct.selectedQuantity : 1)
         }, 0)
      }
   }
})