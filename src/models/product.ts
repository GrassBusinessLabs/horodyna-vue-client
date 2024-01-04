export interface Product {
   id: number,
   title: string,
   description: string,
   category: string,
   price: number,
   unit: string,
   stock: number,
   status: boolean,
   image: string,
   user_id: number,
   farm_id: number,
   seller: string,
   selectedQuantity?: number,
   address: string
}