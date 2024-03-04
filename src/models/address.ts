export interface CreateAddress {
  user_id: number,
  title: string,
  city: string,
  country: string,
  address: string,
  lat: number,
  lon: number
}

export interface Address {
  id: number,
  title: string,
  city: string,
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