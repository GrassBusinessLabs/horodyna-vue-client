import {defineStore} from 'pinia'
import type {Product} from '@/models'

export const productStore = defineStore("productStore", {
   state: () => ({
      basket: [] as Product[],
      total: 0
   }),
   actions: {
      addProductToCart(product: Product) {
         const currentProduct = this.basket.find(item => item.name === product.name)
         
         if (currentProduct?.selectedQuantity) {
            currentProduct.selectedQuantity += 1
            currentProduct.sum = currentProduct.selectedQuantity * currentProduct.price
         } else {
            this.basket.push(product)
         }
      },
      decreaseProductQuantity(product: Product) {
         const currentProduct = this.basket.find(item => item.name === product.name)
         
         if (currentProduct?.selectedQuantity && currentProduct.selectedQuantity > 1) {
            currentProduct.selectedQuantity -= 1
            currentProduct.sum = currentProduct.selectedQuantity * currentProduct.price
         } else {
            const index = this.basket.indexOf(currentProduct)
            if (index !== -1) {
               this.basket.splice(index, 1)
            }
         }
      },
      getCurrentProductQuantity (product: Product) {
         const currentProduct = this.basket.find(item => item.name === product.name)
         return currentProduct?.selectedQuantity
      },
      getCartLength() {
         return this.basket.length
      },
      getTotalSum() {
         return this.basket?.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.selectedQuantity, 0)
      }
   }
})