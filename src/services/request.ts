import {apiService} from '@/services/api'
import type { CurrentUser, LoginBody } from '@/models'

export const requestService = () => {
   const api = apiService()

   async function login(body: LoginBody): Promise<CurrentUser> {
      return api.post('/auth/login', body)
   }

   async function getCurrentUser(): Promise<CurrentUser> {
      return api.get('users')
   }

   async function logout(): Promise<void> {
      return api.post('/auth/logout')
   }

   return {
      login,
      getCurrentUser,
      logout
   }
}
