import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'

import {IonicVue} from '@ionic/vue'

// Core CSS required for Ionic components to work properly
import '@ionic/vue/css/core.css'

// Basic CSS for apps built with Ionic
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

// Optional CSS utils that can be commented out
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

// Theme variables
import '@/theme/variables.css'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Global styles
import '@/theme/styles.scss'

// Router
import router from './router'

// Internationalization
import i18n from '@/i18n'

// Toast
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import {DEFAULT_TOAST_CONFIG} from '@/constants/app'

const vuetify = createVuetify({
   components,
   directives,
   icons: {
      defaultSet: 'mdi'
   }
})

const app = createApp(App)
   .use(IonicVue)
   .use(vuetify)
   .use(createPinia())
   .use(i18n as any)
   .use(Toast, DEFAULT_TOAST_CONFIG as any)
   .use(router)

router.isReady().then(() => {
   app.mount('#app')
})
