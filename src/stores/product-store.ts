import {defineStore} from 'pinia'
import type {FarmProduct, Product} from '@/models'


export const productStore = defineStore("productStore", {
   state: () => ({
      basket: [] as Product[], total:0
   }),
   actions: {
      addProductToCart(product: Product) {
         const currentProduct = this.basket.find(item => item.name === product.name)
         
         if (currentProduct) {
            currentProduct.selectedQuantity += 1
            currentProduct.sum = currentProduct.selectedQuantity * currentProduct.price
         } else {
            this.basket.push(product)
         }
      },
      decreaseProductQuantity(product: FarmProduct) {
         const currentProduct = this.basket.find(item => item.name === product.name)
         
         if (currentProduct && currentProduct.selectedQuantity > 1) {
            currentProduct.selectedQuantity -= 1
            currentProduct.sum = currentProduct.selectedQuantity * currentProduct.price
         }
      },
      getCurrentProductQuantity (product: FarmProduct) {
         const currentProduct = this.basket.find(item => item.name === product.name)
         return currentProduct?.selectedQuantity
      }
   }
})