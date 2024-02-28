export interface Order {
   id: number,
   order_items_count: number,
   status: string,
   comment: string,
   address_id: number,
   user_id: number,
   product_price: number,
   shipping_price: number,
   total_price: number,
   created_data: string
}

export interface OrderById {
   id: number,
   order_items: OrderItem[],
   status: string,
   comment: string,
   address: number,
   user_id: number,
   product_price: number,
   shipping_price: number,
   total_price: number,
   farm: {
      id: number,
      name: string,
      city: string,
      address: string,
      latitude: number,
      longitude: number,
      user_id: number
   }
}

export interface OrderResponse {
   items: Order[],
   pages: number,
   total: number
}

export interface CreateOrder {
   order_items: CreateOrderItem[],
   address: string,
   comment: string,
   shipping_price: number
}

export interface OrderItem {
   id: number,
   order_id: number,
   offer_id: number,
   title: string,
   price: number,
   total_price: number,
   amount: number,
   farm: {
      id: number,
      name: string,
      city: string,
      address: string,
      latitude: number,
      longitude: number,
      all_images: [],
      user_id: number
   }
}

export interface CreateOrderItem {
   id?: number,
   offer_id: number,
   amount: number
}

export interface UpdateOrderItem {
   id: number,
   amount: number
}

export interface OrderStatus {
   status: string
}