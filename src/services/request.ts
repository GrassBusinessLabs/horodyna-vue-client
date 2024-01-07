import {apiService} from '@/services/api'
import type {
   CreateOrder,
   CreateOrderItem,
   CurrentUser,
   FarmResponse,
   LoginBody,
   OfferResponse,
   Order,
   OrderItem,
   OrderResponse,
   PasswordChangeBody,
   RegisterBody,
   UpdateOrderItem,
   UserData
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

   async function getUserData(): Promise<UserData> {
      return api.get('/users')
   }
   
   async function getFarms(): Promise<FarmResponse> {
      return api.get('/farms')
   }
   
   async function getOrders(): Promise<OrderResponse> {
      return api.get('/orders')
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

   async function getOffers(): Promise<OfferResponse> {
      return api.get('/offers?all=true')
   }
   
   async function logout(): Promise<void> {
      return api.post('/auth/logout')
   }

   return {
      login,
      register,
      changePassword,
      getUserData,
      getFarms,
      getOrders,
      createOrder,
      createOrderItem,
      updateOrderItem,
      getOffers,
      logout
   }
}
