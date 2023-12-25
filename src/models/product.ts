export interface Product {
   productId: number | string,
   name: string,
   price: number,
   img: string,
   category: string,
   author: string,
   selectedQuantity?: number,
   sum?: number,
   address: string
}