<template>
   <products-layout>
      <v-list v-if="filteredOffers?.length" class='pa-0 ma-0 bg-transparent'>
         <app-offer v-for='offer in filteredOffers' :key='offer.id' :offer='offer'
            @offer-details="showOfferDetails" />
      </v-list>
      <v-sheet v-else class='pa-6 pt-5 rounded-lg no-offer-sheet'>
         <v-list-item-title class='no-item-title text-center py-1'>
            Поки що немає жодного товару
         </v-list-item-title>
         <v-btn class='text-white mt-4 w-100 rounded-lg app-color btn-text' @click='routing.toCatalog()' variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet>

      <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
         :initial-breakpoint="0.8">
         <ion-content style="--background: transparent">
            <v-card height='730' class='pa-0 rounded-t-lg app-item-color'>
               <v-card-title class='py-4 text-center my-border my-title'>
                  {{ offersDetails?.title }}
               </v-card-title>
               <v-list class="pa-5 bg-transparent">
                  <v-carousel class="rounded-lg" height="360" :show-arrows="false" v-if='offersDetails?.image'>
                     <v-carousel-item :src='linkIMG + offersDetails?.image' cover>
                     </v-carousel-item>

                     <v-carousel-item v-for='image of offersDetails?.additional_images' :key="image.id"
                        :src='linkIMG + image.name' cover>
                     </v-carousel-item>
                  </v-carousel>

                  <v-sheet class="mt-4 rounded-lg offer-details bg-transparent">
                     <v-list-item-title class='offer-description text-center text-grey-darken-3'>
                     {{ offersDetails?.description }}
                  </v-list-item-title>
                  <v-list-item-title class='offer-price my-color my-height text-center'>
                     {{ offersDetails?.price }} грн за {{ translate(offersDetails?.unit) }}
                  </v-list-item-title>
                  </v-sheet>
               </v-list>
            </v-card>
         </ion-content>
      </ion-modal>
   </products-layout>
</template>

<script setup lang='ts'>
import AppOffer from '@/components/AppOffer.vue'
import { useRouting, useTranslate } from '@/composables'
import ProductsLayout from '@/layouts/ProductsLayout.vue'
import { Offer } from '@/models'
import { useCategoryStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { IonContent, IonModal, onIonViewWillEnter } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const routing = useRouting()

const { translate } = useTranslate()

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const categoryStore = useCategoryStore()
const { getCurrentCategory } = categoryStore
const currentCategory = ref<string | null>(null)

const offerStore = useOfferStore()
const { populateOffers } = offerStore
const { offers } = storeToRefs(offerStore)

const filteredOffers = ref()

const offersDetails = ref<Offer>()

const orderStore = useOrderStore()
const { populateOrders } = orderStore

const farmStore = useFarmStore()
const { populateFarms } = farmStore

onIonViewWillEnter(async () => {
   await populateOffers()
   await populateOrders()
   await populateFarms()

   currentCategory.value = getCurrentCategory()
   filteredOffers.value = offers.value?.filter((offer: Offer) => offer.category === currentCategory.value)
})

const isOpen = ref(false)

const modalDismissed = () => {
   isOpen.value = false
}

const showOfferDetails = (offer: Offer) => {
   offersDetails.value = offer
   isOpen.value = true
}
</script>

<style scoped>
.no-offer-sheet {
   margin: 19px 15px;
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
}

.offer-card:last-child {
   margin-bottom: 20px;
} 

.no-item-title {
   font-size: 30px;
   white-space: normal;
}

.v-carousel {
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.082);
}

.offer-description {
   font-size: 20px;
   white-space: normal;
   line-height: 1;
}

.offer-price {
   font-size: 17px;
}

.offer-details {
   border: 2px solid rgba(0, 0, 0, 0.144);
   padding: 10px;
   padding-bottom: 7px;
}

.btn-text {
   padding-top: 4px !important;
   padding-bottom: 5px !important;
}
</style>