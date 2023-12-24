export interface Purchase {
   purchaseId: number
   date: string
   products: ProductItem[]
}

interface ProductItem {
   name: string
   price: number
   img: string
   author: string
   quantity: number
}