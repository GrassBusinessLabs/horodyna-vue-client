import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
import { authTokenService } from '@/services';
import { useToastDialog } from '@/composables';
import SignInView from '@/views/SignInView.vue';
import CatalogView from '@/views/CatalogView.vue';
import ErrorView from '@/views/ErrorView.vue';
import ProductsView from '@/views/ProductsView.vue';
import SettingsView from '@/views/SettingsView.vue';
import PurchaseHistoryView from '@/views/PurchaseHistoryView.vue';
import PaymentView from '@/views/PaymentView.vue';
import MapView from '@/views/MapView.vue';
import AboutPage from '@/components/AboutPage.vue'


const toastDialog = useToastDialog();
const authToken = authTokenService();

const routes = [
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
      path: '/Catalog',
      name: 'Catalog',
      component: CatalogView,
      meta: { auth: true }
   },
   {
      path: '/products',
      name: 'Products',
      component: ProductsView,
   },
   {
      path: '/settings',
      name: 'Settings',
      component: SettingsView,
   },
   {
      path: '/purchases',
      name: 'PurchaseHistory',
      component: PurchaseHistoryView,
   },
   {
      path: '/payment',
      name: 'Payment',
      component: PaymentView,
   },
   {
      path: '/map',
      name: 'Map',
      component: MapView,
   },
   {
      path: '/about',
      name: 'About',
      component: AboutPage,
   },
   {
      path: '/:all(.*)*',
      name: 'all',
      component: ErrorView
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

router.beforeEach(async (to: RouteLocationNormalized) => {
   try {
      const metaAuth: boolean = (to.meta as any).auth as boolean
      const authTokenValue: string | null = await authToken.get()

      if (typeof metaAuth !== 'boolean') {
         return true
      }

      if (!authTokenValue && metaAuth) {
         return { name: 'SignIn' }
      }

      return true
   } catch (e) {
      console.error(e)
      toastDialog.error(e)
      return false
   }
});

export default router;
