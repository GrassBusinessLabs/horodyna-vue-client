export interface CreateAddress {
  user_id: number,
  name: string,
  city_ref: string,
  city: string,
  department: string,
  country: string,
  address: string,
  lat: number,
  lon: number
}

export interface Address {
  id: number,
  name: string,
  city_ref: string,
  country: string,
  address: string,
  department: string,
  lat: number,
  lon: number,
  user: {
      id: number,
      name: string,
      email: string
  }
}

export interface AddressResponse {
  items: Address[],
  pages: number,
  total: number
}