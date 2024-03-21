import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'

import AboutPage from '@/components/AboutPage.vue'
import { useToastDialog } from '@/composables'
import { authTokenService } from '@/services'
import AdminPanelView from '@/views/AdminPanelView.vue'
import CartView from '@/views/CartView.vue'
import CatalogView from '@/views/CatalogView.vue'
import ErrorView from '@/views/ErrorView.vue'
import MapView from '@/views/MapView.vue'
import OrdersView from '@/views/OrdersView.vue'
import PasswordChangeView from '@/views/PasswordChangeView.vue'
import PaymentView from '@/views/PaymentView.vue'
import ProductsView from '@/views/ProductsView.vue'
import PurchaseHistoryView from '@/views/PurchaseHistoryView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import SettingsView from '@/views/SettingsView.vue'
import SignInView from '@/views/SignInView.vue'

const toastDialog = useToastDialog()
const authToken = authTokenService()

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      redirect: '/sign-in'
   },
   {
      path: '/sign-in',
      name: 'SignIn',
      component: SignInView,
      alias: '/',
      meta: { auth: false }
   },
   {
      path: '/register',
      name: 'Register',
      component: RegistrationView,
      alias: '/',
      meta: { auth: false }
   },
   {
      path: '/catalog',
      name: 'Catalog',
      component: CatalogView,
      meta: { auth: true }
   },
   {
      path: '/products',
      name: 'Products',
      component: ProductsView,
      meta: { auth: true }
   },
   {
      path: '/settings',
      name: 'Settings',
      component: SettingsView,
      meta: { auth: true }
   },
   {
      path: '/purchases',
      name: 'PurchaseHistory',
      component: PurchaseHistoryView,
      meta: { auth: true }
   },
   {
      path: '/payment',
      name: 'Payment',
      component: PaymentView,
      meta: { auth: true }
   },
   {
      path: '/map',
      name: 'Map',
      component: MapView,
      meta: { auth: true }
   },
   {
      path: '/about',
      name: 'About',
      component: AboutPage,
      meta: { auth: true }
   },
   {
      path: '/password-change',
      name: 'PasswordChange',
      component: PasswordChangeView,
      meta: { auth: true }
   },
   {
      path: '/admin-panel',
      name: 'AdminPanel',
      component: AdminPanelView,
      meta: { auth: true }
   },
   {
      path: '/orders',
      name: 'Orders',
      component: OrdersView,
      meta: { auth: true }
   },
   {
      path: '/cart',
      name: 'Cart',
      component: CartView,
      meta: { auth: true }
   },
   {
      path: '/:all(.*)*',
      name: 'all',
      component: ErrorView
   },
] as RouteRecordRaw[]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes
} as any)

router.beforeEach(async to => {
   try {
      const metaAuth: boolean = (to.meta as any).auth as boolean
      const authTokenValue: string | null = await authToken.get()

      if (typeof metaAuth as any !== 'boolean') {
         return true
      }

      if (!authTokenValue && metaAuth) {
         return {name: 'SignIn'}
      }

      if (authTokenValue && !metaAuth) {
         return {name: 'Catalog'}
      }

      return true
   } catch (e) {
      console.error(e)
      toastDialog.error(e)
      return false
   }
})

export default router
