export interface Farm {
   id: string,
   name: string,
   address: string,
   category: string,
   products: FarmProduct[],
}

export interface FarmProduct {
   productId: string,
   name: string,
   price: number,
   img: string,
   category: string,
   author: string
}