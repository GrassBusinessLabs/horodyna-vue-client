import {useRouter} from 'vue-router'

export const useRouting = () => {
   const router = useRouter()

   async function toSignIn() {
      return router.push('/sign-in')
   }

   async function toCatalog() {
      return router.push('/catalog')
   }
   
   async function toProducts() {
      return router.push('/products')
   }
   
   async function toSettings() {
      return router.push('/settings')
   }
   
   async function toPurchases() {
      return router.push('/purchases')
   }

   return {
      toSignIn,
      toCatalog,
      toProducts,
      toSettings,
      toPurchases
   }
}
