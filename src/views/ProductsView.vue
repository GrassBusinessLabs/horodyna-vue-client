<template>
   <products-layout>
      <v-list v-if="filteredOffers?.length" class='pa-0 ma-0 bg-transparent'>
         <app-offer v-for='offer in filteredOffers' :key='offer.id' :offer='offer' @offer-details="showOfferRates" />
      </v-list>
      <v-sheet v-else class='pa-6 pt-5 rounded-lg no-offer-sheet'>
         <v-list-item-title class='no-item-title text-center py-1'>
            Поки що немає жодного товару
         </v-list-item-title>
         <v-btn class='text-white mt-4 w-100 rounded-lg app-color btn-text' @click='routing.toCatalog()' variant='flat'>
            Перейти в каталог
         </v-btn>
      </v-sheet>

      <ion-modal :is-open="isOpen" @ionModalDidDismiss="modalDismissed" :handle="false" :initial-breakpoint="1"
         :breakpoints="[0, 1]">
         <v-card @touchmove.stop class='pa-0'>
            <v-list class="pa-0 pb-6 bg-transparent">
               <svg @click="isOpen = false" class="close-btn" width="32" height="32" viewBox="0 0 32 32" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#529075" />
                  <path
                     d="M8.64645 15.6464C8.45118 15.8417 8.45118 16.1583 8.64645 16.3536L11.8284 19.5355C12.0237 19.7308 12.3403 19.7308 12.5355 19.5355C12.7308 19.3403 12.7308 19.0237 12.5355 18.8284L9.70711 16L12.5355 13.1716C12.7308 12.9763 12.7308 12.6597 12.5355 12.4645C12.3403 12.2692 12.0237 12.2692 11.8284 12.4645L8.64645 15.6464ZM23 15.5L9 15.5L9 16.5L23 16.5L23 15.5Z"
                     fill="white" />
               </svg>
               <v-carousel hide-delimiters class="rounded-lg" height="220" :show-arrows="false"
                  v-if='offersDetails?.image'>
                  <v-carousel-item :src='linkIMG + offersDetails?.image' cover>
                  </v-carousel-item>

                  <v-carousel-item v-for='image of offersDetails?.additional_images' :key="image.id"
                     :src='linkIMG + image.name' cover>
                  </v-carousel-item>
               </v-carousel>

               <div class="offer-details mt-1">
                  <div class="d-flex justify-space-between">
                     <p class="offer-name">{{ offersDetails?.title }}</p>
                     <p class="offer-price">{{ offersDetails?.price }}₴ за {{ translate(offersDetails?.unit) }}</p>
                  </div>
                  <p class="offer-description">{{ offersDetails?.description }}</p>
               </div>

               <div class="divider"></div>

               <div class="rates-title">Оцінки товару</div>

               <div class="pb-3">
                  <app-comment></app-comment>
                  <app-comment></app-comment>
               </div>

               <div class="add-rate-title">Додати оцінку</div>

               <div class="text-center">
                  <svg class="star-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M8.58699 8.236L11.185 3.004C11.2606 2.85259 11.3769 2.72523 11.5209 2.63622C11.6648 2.54721 11.8307 2.50006 12 2.50006C12.1692 2.50006 12.3351 2.54721 12.4791 2.63622C12.6231 2.72523 12.7394 2.85259 12.815 3.004L15.413 8.236L21.221 9.08C21.3885 9.10323 21.5461 9.17309 21.6759 9.28161C21.8056 9.39013 21.9022 9.53294 21.9546 9.69373C22.0071 9.85452 22.0133 10.0268 21.9725 10.191C21.9317 10.3551 21.8456 10.5045 21.724 10.622L17.522 14.692L18.514 20.442C18.641 21.18 17.861 21.742 17.194 21.394L12 18.678L6.80499 21.394C6.13899 21.743 5.35899 21.18 5.48599 20.441L6.47799 14.691L2.27599 10.621C2.15498 10.5034 2.06939 10.3542 2.02896 10.1903C1.98852 10.0265 1.99487 9.85457 2.04726 9.69415C2.09966 9.53373 2.19601 9.39122 2.32536 9.28284C2.45471 9.17445 2.61188 9.10452 2.77899 9.081L8.58699 8.236Z"
                        stroke="#529075" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg class="star-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M8.58699 8.236L11.185 3.004C11.2606 2.85259 11.3769 2.72523 11.5209 2.63622C11.6648 2.54721 11.8307 2.50006 12 2.50006C12.1692 2.50006 12.3351 2.54721 12.4791 2.63622C12.6231 2.72523 12.7394 2.85259 12.815 3.004L15.413 8.236L21.221 9.08C21.3885 9.10323 21.5461 9.17309 21.6759 9.28161C21.8056 9.39013 21.9022 9.53294 21.9546 9.69373C22.0071 9.85452 22.0133 10.0268 21.9725 10.191C21.9317 10.3551 21.8456 10.5045 21.724 10.622L17.522 14.692L18.514 20.442C18.641 21.18 17.861 21.742 17.194 21.394L12 18.678L6.80499 21.394C6.13899 21.743 5.35899 21.18 5.48599 20.441L6.47799 14.691L2.27599 10.621C2.15498 10.5034 2.06939 10.3542 2.02896 10.1903C1.98852 10.0265 1.99487 9.85457 2.04726 9.69415C2.09966 9.53373 2.19601 9.39122 2.32536 9.28284C2.45471 9.17445 2.61188 9.10452 2.77899 9.081L8.58699 8.236Z"
                        stroke="#529075" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg class="star-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M8.58699 8.236L11.185 3.004C11.2606 2.85259 11.3769 2.72523 11.5209 2.63622C11.6648 2.54721 11.8307 2.50006 12 2.50006C12.1692 2.50006 12.3351 2.54721 12.4791 2.63622C12.6231 2.72523 12.7394 2.85259 12.815 3.004L15.413 8.236L21.221 9.08C21.3885 9.10323 21.5461 9.17309 21.6759 9.28161C21.8056 9.39013 21.9022 9.53294 21.9546 9.69373C22.0071 9.85452 22.0133 10.0268 21.9725 10.191C21.9317 10.3551 21.8456 10.5045 21.724 10.622L17.522 14.692L18.514 20.442C18.641 21.18 17.861 21.742 17.194 21.394L12 18.678L6.80499 21.394C6.13899 21.743 5.35899 21.18 5.48599 20.441L6.47799 14.691L2.27599 10.621C2.15498 10.5034 2.06939 10.3542 2.02896 10.1903C1.98852 10.0265 1.99487 9.85457 2.04726 9.69415C2.09966 9.53373 2.19601 9.39122 2.32536 9.28284C2.45471 9.17445 2.61188 9.10452 2.77899 9.081L8.58699 8.236Z"
                        stroke="#529075" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg class="star-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M8.58699 8.236L11.185 3.004C11.2606 2.85259 11.3769 2.72523 11.5209 2.63622C11.6648 2.54721 11.8307 2.50006 12 2.50006C12.1692 2.50006 12.3351 2.54721 12.4791 2.63622C12.6231 2.72523 12.7394 2.85259 12.815 3.004L15.413 8.236L21.221 9.08C21.3885 9.10323 21.5461 9.17309 21.6759 9.28161C21.8056 9.39013 21.9022 9.53294 21.9546 9.69373C22.0071 9.85452 22.0133 10.0268 21.9725 10.191C21.9317 10.3551 21.8456 10.5045 21.724 10.622L17.522 14.692L18.514 20.442C18.641 21.18 17.861 21.742 17.194 21.394L12 18.678L6.80499 21.394C6.13899 21.743 5.35899 21.18 5.48599 20.441L6.47799 14.691L2.27599 10.621C2.15498 10.5034 2.06939 10.3542 2.02896 10.1903C1.98852 10.0265 1.99487 9.85457 2.04726 9.69415C2.09966 9.53373 2.19601 9.39122 2.32536 9.28284C2.45471 9.17445 2.61188 9.10452 2.77899 9.081L8.58699 8.236Z"
                        stroke="#529075" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg class="star-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M8.58699 8.236L11.185 3.004C11.2606 2.85259 11.3769 2.72523 11.5209 2.63622C11.6648 2.54721 11.8307 2.50006 12 2.50006C12.1692 2.50006 12.3351 2.54721 12.4791 2.63622C12.6231 2.72523 12.7394 2.85259 12.815 3.004L15.413 8.236L21.221 9.08C21.3885 9.10323 21.5461 9.17309 21.6759 9.28161C21.8056 9.39013 21.9022 9.53294 21.9546 9.69373C22.0071 9.85452 22.0133 10.0268 21.9725 10.191C21.9317 10.3551 21.8456 10.5045 21.724 10.622L17.522 14.692L18.514 20.442C18.641 21.18 17.861 21.742 17.194 21.394L12 18.678L6.80499 21.394C6.13899 21.743 5.35899 21.18 5.48599 20.441L6.47799 14.691L2.27599 10.621C2.15498 10.5034 2.06939 10.3542 2.02896 10.1903C1.98852 10.0265 1.99487 9.85457 2.04726 9.69415C2.09966 9.53373 2.19601 9.39122 2.32536 9.28284C2.45471 9.17445 2.61188 9.10452 2.77899 9.081L8.58699 8.236Z"
                        stroke="#529075" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
               </div>

               <textarea placeholder="Введіть текст коментаря до страви..."></textarea>

               <div class="text-center">
                  <v-btn class="app-btn">Залишити коментар</v-btn>
               </div>
            </v-list>
         </v-card>
      </ion-modal>
   </products-layout>
</template>

<script setup lang='ts'>
import AppComment from '@/components/AppComment.vue'
import AppOffer from '@/components/AppOffer.vue'
import { useRouting, useTranslate } from '@/composables'
import ProductsLayout from '@/layouts/ProductsLayout.vue'
import { Offer } from '@/models'
import { useCategoryStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { IonModal, onIonViewWillEnter } from '@ionic/vue'
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

const showOfferRates = (offer: Offer) => {
   offersDetails.value = offer
   isOpen.value = true
}
</script>

<style scoped>
textarea {
   box-shadow: 0 8px 24px 0 rgba(149, 157, 165, 0.2);
   background: var(--color-white);
   border-radius: 8px;
   margin: 14px 15px;
   margin-top: 15px;
   width: calc(100% - 58px);
   height: 104px;
   outline: none;
   padding: 14px;
}

svg {
   margin-right: 9px;
}

svg:last-child {
   margin-right: 0;
}

.rates-title {
   font-weight: 600;
   font-size: 18px;
   line-height: 150%;
   letter-spacing: -0.01em;
   text-align: center;
   color: var(--color-dark);
}

.add-rate-title {
   font-weight: 600;
   font-size: 18px;
   line-height: 150%;
   letter-spacing: -0.01em;
   text-align: center;
   color: var(--color-dark);
   margin-top: 10px;
   margin-bottom: 20px;
}

.offer-details {
   padding: 15px;
}

.offer-name {
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
}

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
   border-radius: 8px 8px 0 0 !important;
}

.offer-description {
   font-weight: 400;
   font-size: 16px;
   line-height: 150%;
   color: var(--color-dark);
   margin-top: 10px;
}

.offer-price {
   font-weight: 600;
   font-size: 18px;
   line-height: 120%;
   color: var(--color-dark);
}

.btn-text {
   padding-top: 4px !important;
   padding-bottom: 5px !important;
}

.v-card {
   height: 100vh !important;
   background: var(--color-bg);
   overflow-y: auto;
}

.divider {
   margin: 2px 0;
   margin-left: 15px;
   margin-bottom: 30px;
   width: calc(100% - 30px);
}

.close-btn {
   position: absolute;
   top: 15px;
   left: 15px;
   z-index: 2;
}
</style>