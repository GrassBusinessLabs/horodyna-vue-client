import {apiService} from '@/services/api'
import type {
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
   PasswordChangeBody,
   RegisterBody,
   UpdateOrderItem,
} from '@/models'

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
      createOrderItem,
      updateOrderItem,
      deleteOrderItem,
      getOffers,
      logout,
      createAddress,
      getAddresses
   }
}
