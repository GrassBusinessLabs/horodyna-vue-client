import {Product} from '@/models/product.ts'

export interface Farm {
   id: string,
   name: string,
   address: string,
   category: string,
   products: Product[],
}