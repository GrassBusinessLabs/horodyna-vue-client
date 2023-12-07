import {useRouter} from 'vue-router'

export const useRouting = () => {
   const router = useRouter()

   async function toSignIn() {
      return router.push('/sign-in')
   }

   async function toPosts() {
      return router.push('/catalog')
   }
   
   async function toProducts() {
      return router.push('/products')
   }

   return {
      toSignIn,
      toPosts,
      toProducts
   }
}
