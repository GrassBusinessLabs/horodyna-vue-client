import {defineStore} from 'pinia'
import type {Ref} from 'vue'
import {ref} from 'vue'

import type {CurrentUser, CurrentUserData} from '@/models'
import {authTokenService, requestService} from '@/services'
import {useHandleError, useRouting} from '@/composables'

export const useUserStore = defineStore('user', () => {
   const {handleError} = useHandleError()
   const routing = useRouting()

   const request = requestService()
   const authToken = authTokenService()

   const currentUser: Ref<CurrentUserData | null> = ref<CurrentUserData | null>(null)
   
   function setCurrentUser(value: CurrentUser | CurrentUserData | null): void {
      currentUser.value = value?.user ? value?.user : value
   }

   async function getUserData(): Promise<CurrentUserData | null> {
      try {
         if (currentUser.value?.id) {
            return currentUser.value
         }

         const userData: CurrentUserData = await request.getCurrentUser()
         setCurrentUser(userData)

         return currentUser.value
      } catch (e) {
         console.error(e)
         handleError(e)
         return null
      }
   }

   async function populate(): Promise<void> {
      try {
         const token: string | null = await authToken.get()

         if (!token) {
            return
         }

         const userData: CurrentUserData | null = await getUserData()
         if (!userData) {
            await logout()
         }
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }

   async function logout(): Promise<void> {
      try {
         await request.logout()
      } catch (e) {
         console.error(e)
      } finally {
         await authToken.destroy()
         setCurrentUser(null)
         await routing.toSignIn()
      }
   }

   return {
      currentUser,
      setCurrentUser,
      populate,
      logout
   }
})
