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
   user_id: number,
   farm_id: number,
}

export interface OfferResponse {
   items: Offer[],
   pages: number,
   total: number
}