import {apiService} from '@/services/api'
import type {
   CurrentUser,
   FarmResponse,
   LoginBody,
   OfferResponse,
   OrderResponse,
   PasswordChangeBody,
   RegisterBody,
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
      getOffers,
      logout
   }
}
