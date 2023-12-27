import {defineStore} from 'pinia'
import type {Product} from '@/models'

export const productStore = defineStore("productStore", {
   state: () => ({
      basket: [] as Product[],
      selectedProduct: {} as Product,
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
         const currentProduct = this.basket.find(item => item.name === product.name)
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