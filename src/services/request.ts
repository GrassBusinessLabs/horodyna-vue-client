import {apiService} from '@/services/api'
import type {
   CurrentUser,
   CurrentUserData, Farm,
   LoginBody, Order,
   PasswordChangeBody,
   RegisterBody
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

   async function getCurrentUser(): Promise<CurrentUserData> {
      return api.get('users')
   }
   
   async function getFarms(): Promise<Farm[]> {
      return api.get('farms')
   }
   
   async function getOrders(): Promise<Order[]> {
      return api.get('orders')
   }
   
   async function logout(): Promise<void> {
      return api.post('/auth/logout')
   }

   return {
      login,
      register,
      changePassword,
      getCurrentUser,
      getFarms,
      getOrders,
      logout
   }
}
