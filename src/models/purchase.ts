import {Product} from '@/models/product.ts'

export interface Purchase {
   purchaseId: number
   date: string
   products: Product[]
}