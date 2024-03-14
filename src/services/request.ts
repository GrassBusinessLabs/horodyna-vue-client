import type {
   Address,
   AddressResponse,
   CreateAddress,
   CreateOrder,
   CreateOrderItem,
   CurrentUser,
   Farm,
   FarmResponse,
   LoginBody,
   OfferResponse,
   Order,
   OrderById,
   OrderItem,
   OrderResponse,
   OrderStatus,
   PasswordChangeBody,
   RegisterBody,
   UpdateOrder,
   UpdateOrderItem,
} from '@/models'
import { apiService } from '@/services/api'

export const requestService = () => {
   const api = apiService()

   async function login(body: LoginBody): Promise<CurrentUser> {
      return api.post('/auth/login', body)
   }
   
   async function register(body: RegisterBody): Promise<CurrentUser> {
      return api.post('/auth/register', body)
   }
   
   async function changePassword(body: PasswordChangeBody): Promise<void> {
      return api.post('/auth/change-pwd', body)
   }

   async function getCurrentUser(): Promise<CurrentUser> {
      return api.get('users')
   }
   
   async function getFarms(): Promise<FarmResponse> {
      return api.get('/farms')
   }

   async function getFarmById(id: number): Promise<Farm> {
      return api.post(`/farms/${id}`)
   }
   
   async function getOrders(): Promise<OrderResponse> {
      return api.get('/orders')
   }

   async function getOrderById(id: number): Promise<OrderById> {
      return api.get(`/orders/${id}`)
   }

   async function createOrder(body: CreateOrder): Promise<Order> {
      return api.post('/orders', body)
   }

   async function deleteOrder(order_id: number): Promise<Order> {
      return api.del(`/orders/${order_id}`)
   }

   async function updateOrderDepartment(body: UpdateOrder): Promise<Order> {
      return api.put(`/orders/${body.order_id}`, body)
   }

   async function createOrderItem(body: CreateOrderItem): Promise<OrderItem> {
      return api.post(`/order-items/${body.id}`, body)
   }

   async function updateOrderItem(body: UpdateOrderItem){
      return api.put(`/order-items/${body.id}`, body)
   }

   async function deleteOrderItem(id: number){
      return api.del(`/order-items/${id}`)
   }

   async function getOffers(): Promise<OfferResponse> {
      return api.get('/offers?all=true')
   }
   
   async function logout(): Promise<void> {
      return api.post('/auth/logout')
   }

   async function createAddress(body: CreateAddress): Promise<void> {
      return api.post('/address', body)
   }

   async function getAddresses(): Promise<AddressResponse> {
      return api.get('/address')
   }

   async function getAddressByUserId(id: number): Promise<Address> {
      return api.get(`/address/by-user/${id}`)
   }

   async function setOrderInSubmitted(farm_id: number, order_id: number, body: OrderStatus): Promise<AddressResponse> {
      return api.put(`/orders/receiver-status/${farm_id}/${order_id}`, body)
   }

   async function getSplitOrders(order_id: number): Promise<OrderById[]> {
      return api.get(`/orders/split/${order_id}`)
   }

   async function submitSplittedOrder(farm_id: number, order_id: number): Promise<OrderById> {
      return api.post(`/orders/split/${farm_id}/${order_id}`)
   }

   async function deleteSplittedOrder(farm_id: number, order_id: number): Promise<void> {
      return api.del(`/orders/split/${farm_id}/${order_id}`)
   }

   async function markOrderAsCompleted(order_id: number, body): Promise<void> {
      return api.put(`/orders/receiver-status/${order_id}`, body)
   }

   return {
      login,
      register,
      changePassword,
      getCurrentUser,
      getFarms,
      getFarmById,
      getOrders,
      getOrderById,
      createOrder,
      deleteOrder,
      updateOrderDepartment,
      createOrderItem,
      updateOrderItem,
      deleteOrderItem,
      getOffers,
      logout,
      createAddress,
      getAddresses,
      setOrderInSubmitted,
      getSplitOrders,
      submitSplittedOrder,
      deleteSplittedOrder,
      getAddressByUserId,
      markOrderAsCompleted
   }
}
