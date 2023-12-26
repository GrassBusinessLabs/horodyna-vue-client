import {Product} from '@/models/product.ts'

export interface Farm {
   id: string,
   name: string,
   farmAddress: string,
   category: string,
   products: Product[],
}