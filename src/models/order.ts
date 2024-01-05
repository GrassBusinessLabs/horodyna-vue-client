export interface Order {
   id: number,
   order_items: [
      {
         id: number,
         order_id: number,
         offer_id: number,
         title: string,
         price: number,
         total_price: number,
         amount: number
      }
   ],
   status: string,
   comment: string,
   address_id: number,
   user_id: number,
   product_price: number,
   shipping_price: number,
   total_price: number
}

export interface OrderResponse {
   items: Order[],
   pages: number,
   total: number
}

export interface CreateOrder {
   order_items: CreateOrderItem[],
   address_id: number,
   comment: string,
   shipping_price: number
}

interface CreateOrderItem
{
   offer_id: number,
   amount: number
}

export interface UpdateOrder {
   address_id: number,
   comment: string,
   shipping_price: number,
   status: string
}