export interface Offer {
   id: number,
   title: string,
   description: string,
   category: string,
   price: number,
   unit: string,
   stock: number,
   status: boolean,
   image: string,
   user: {
      id: number,
      name: string,
      email: string
  },
   farm_id: number,
   additional_images: {
      id: number, 
      name: string, 
      entity: string, 
      entity_id: number
   }[]
}

export interface OfferResponse {
   items: Offer[],
   pages: number,
   total: number
}