import { useIonRouter } from '@ionic/vue'

export const useRouting = () => {
   const ionRouter = useIonRouter()
   
   async function toSignIn() {
      return ionRouter.navigate('/sign-in')
   }
   
   async function toCatalog() {
      return ionRouter.navigate('/catalog')
   }
   
   async function toProducts() {
      return ionRouter.navigate('/products')
   }
   
   async function toSettings() {
      return ionRouter.navigate('/settings')
   }
   
   async function toPurchases() {
      return ionRouter.navigate('/purchases')
   }
   
   async function toMap() {
      return ionRouter.navigate('/map')
   }
   
   async function toPayment() {
      return ionRouter.navigate('/payment')
   }
   
   async function toAbout() {
      return ionRouter.navigate('/about')
   }
   
   async function toRegister() {
      return ionRouter.navigate('/register')
   }
   
   async function toPasswordChange() {
      return ionRouter.navigate('/password-change')
   }

   async function toOrders() {
      return ionRouter.navigate('/orders')
   }

   async function toCart() {
      return ionRouter.navigate('/cart')
   }

   async function toFarmers() {
      return ionRouter.navigate('/farmers')
   }
   
   return {
      toSignIn,
      toCatalog,
      toProducts,
      toSettings,
      toPurchases,
      toMap,
      toPayment,
      toAbout,
      toRegister,
      toPasswordChange,
      toOrders,
      toCart,
      toFarmers
   }}