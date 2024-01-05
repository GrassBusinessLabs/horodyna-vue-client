export interface Farm {
   id: number,
   name: string,
   city: string,
   address: string,
   latitude: number,
   longitude: number,
   user: {
      id: number,
      name: string,
      email: string
   }
}

export interface FarmResponse {
   items: Farm[],
   pages: number,
   total: number
}