<template>
   <map-layout>
      <app-map />
      <v-slide-group v-if='filters.length' class='px-2 align-center position-fixed filters-block rounded-xl'>
         <v-chip v-for="(filter, index) in filters" :key="filter" :closable='true' class='mr-2'
            @click:close="removeFilter(index)">
            {{ filter }}
         </v-chip>
      </v-slide-group>
      <v-btn @click="() => isOpen = !isOpen" icon="mdi-filter-cog" variant="flat" class='position-fixed filter-btn'>
      </v-btn>

      <ion-modal :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
      :handle="false" :initial-breakpoint="1"
         :breakpoints="[0, 1]">
            <v-card class='pa-0 rounded-t-lg app-item-color'>
               <v-card-title class='py-6 text-center my-border card-title'>
                  Фільтри
                  <v-icon size='27' icon="mdi-filter-cog"></v-icon>
               </v-card-title>
               <v-slide-group v-if='filters.length' class='px-5 pt-4 pb-2 align-center'>
                  <v-chip v-for="(filter, index) in filters" :key="filter" :closable='true' class='mr-2'
                     @click:close="removeFilter(index)">
                     {{ filter }}
                  </v-chip>
               </v-slide-group>
               <v-list @touchmove.stop max-height="472" :lines="'two'" class='pa-5 bg-transparent'
                  :class="{ 'pt-0': filters.length }">
                  <v-list-item v-for="product in sortedCategory" :key="product.id" :title="product.name"
                     :prepend-avatar="product.img" class='pa-0 pl-4 pr-2 rounded-xl mb-3 app-bg-color-form'>
                     <template v-slot:append>
                        <v-checkbox v-model="filters" :value="product.name" hide-details color='indigo'></v-checkbox>
                     </template>
                  </v-list-item>
               </v-list>
            </v-card>
      </ion-modal>

      <ion-modal :is-open="isOpen2" @ionModalDidDismiss="modalDismissed2" :handle="false" :initial-breakpoint="1"
         :breakpoints="[0, 1]">
         <v-card @touchmove.stop class='pa-0 rounded-t-lg app-item-color'>
            <div class="farm-header d-flex align-center justify-center">
               <p>{{ selectedFarm.address }}</p>
            </div>
            <v-list v-if="selectedFarm.products?.length" 
               class='pa-0 py-2 bg-transparent farm-items-list'>
               <app-farm-item v-for="offer in selectedFarm.products" :key="offer.id" :offer="offer" :class="{ 'inactive-offer': !offer.status }">
               </app-farm-item>
            </v-list>
            <v-list-item-title v-else class='no-item-title text-center mt-5 py-1'>
               Немає жодного товару
            </v-list-item-title>
         </v-card>
      </ion-modal>
   </map-layout>
</template>

<script lang='ts' setup>
import AppFarmItem from '@/components/AppFarmItem.vue'
import AppMap from '@/components/AppMap.vue'
import { useTranslate } from '@/composables'
import { productsData } from '@/constants/products.ts'
import MapLayout from '@/layouts/MapLayout.vue'
import { Farm, Offer } from '@/models'
import { AddressItem, mapService } from '@/services/map'
import { useCartStore, useFarmStore, useOfferStore, useOrderStore } from '@/stores'
import { IonModal, onIonViewWillEnter } from '@ionic/vue'
import { LngLatLike, Marker } from '@tomtom-international/web-sdk-maps'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

interface SelectedFarm extends Farm {
   products: Offer[]
}

const { translate } = useTranslate()

const cartStore = useCartStore()
const { setCart, addProductToCart, removeProductFromCart, resetSelectedOffer } = cartStore
const { selectedOffer } = storeToRefs(cartStore)

const farmStore = useFarmStore()
const { populateFarms, getFarmAddress } = farmStore
const { farms } = storeToRefs(farmStore)

const offerStore = useOfferStore()
const { populateOffers } = offerStore
const { offers } = storeToRefs(offerStore)

const orderStore = useOrderStore()
const { getProductAmount } = orderStore

onIonViewWillEnter(async () => {
   await setCart()
   await populateFarms()
   await populateOffers()
})

const linkIMG = 'https://horodyna.grassbusinesslabs.tk/static/'

const map = mapService()

const sortedCategory = productsData.sort((a, b) => a.name.localeCompare(b.name))

const isOpen = ref(false)
const isOpen2 = ref(false)

const modalDismissed = () => {
   isOpen.value = false
}

const modalDismissed2 = () => {
   isOpen2.value = false
}

const filters = ref<string[]>([])

const removeFilter = (index: number) => {
   filters.value = filters.value.slice(0, index).concat(filters.value.slice(index + 1))
}

const selectedFarm = ref<Partial<SelectedFarm>>({})

watch(filters, async () => {
   map.removeAllMarkers()
   if (farms.value) {
      for (const farm of farms.value) {
         const farmProducts = offers.value?.filter(product => product.farm_id === farm.id)
         if (farmProducts?.length && filters.value.length === 0 || farmProducts?.some((product: Offer) => filters.value.some(filter => product.category === filter))) {
            setTimeout(async () => {
               const addressItems = await map.searchAddresses(farm.address)
               if (addressItems.length > 0) {
                  const onClick = () => {
                     selectedFarm.value = {
                        ...farm,
                        products: farmProducts
                     }
                     isOpen2.value = true
                  }
                  const marker: Marker | null = map.createMarker(farm.id.toString(), addressItems[0].details.position as LngLatLike, onClick)
                  if (marker) {
                     map.addMarkerToMap(marker)
                  }
               }
            }, 300)
         }
      }
   }
}, { immediate: true })

const mapZoom: number = 15
const duration: number = 500

async function selectAddress(address: AddressItem): Promise<void> {
   map.setMapCenter(address.details.position as LngLatLike, { duration })

   if (mapZoom !== map.getMapZoom()) {
      await new Promise(resolve => setTimeout(resolve, duration))
      map.setZoom(15, { duration })
   }
}

watch(selectedOffer, async () => {
   if (selectedOffer.value && farms.value) {
      for (const farm of farms.value) {
         const farmProducts = offers.value?.filter(product => product.farm_id === farm.id)
         if (farmProducts?.some(product => product.title === selectedOffer.value?.title)) {
            selectedFarm.value = farm
            const addressItems = await map.searchAddresses(getFarmAddress(selectedOffer.value.farm_id))
            if (addressItems.length > 0) {
               await selectAddress(addressItems[0])
            }
            break
         }
      }
   }
   resetSelectedOffer()
}, { immediate: true })
</script>

<style lang='scss' scoped>
.farm-items-list {
   margin-top: 100px;
}

.farm-header {
   height: 100px;
   width: 100%;
   background: var(--color-primary);
   position: fixed;
   z-index: 2;
}

.farm-header p {
   font-weight: 600;
   font-size: 18px;
   line-height: 150%;
   letter-spacing: -0.01em;
   text-align: center;
   color: var(--color-white);
   padding: 0 20px;
}

.v-card {
	height: 75vh !important;
}

.filter-btn {
   bottom: 103px;
   right: 12px;
   outline: 2.8px solid rgba(0, 0, 0, 0.055);
}

.card-title {
   font-size: 28px;
}

.v-slide-group {
   height: 40px;
   .v-chip {
      font-size: 16px;
   }
}

.filters-block {
   height: 47px;
   background-color: white;
   bottom: 103px;
   left: 12px;
   right: 72px;
   box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.no-item-title {
   font-size: 30px;
}

.product-image {
   width: 35px;
   height: 35px;
   object-fit: cover;
   border-radius: 12px;
   margin: 5px 0;
}

.v-list-item-subtitle {
   white-space: normal;
   line-height: 1;
}

.v-list-item-title {
   white-space: normal;
   line-height: 1;
}

.app-bg-color-form:last-child {
   margin-bottom: 34px !important;
}

.payment-product {
   padding: 7px 11px;
   border-radius: 17px;
   margin-bottom: 11px;
}

.payment-product:last-child {
   margin-bottom: 0 !important;
}

.offer-title {
   font-size: 17px;
   margin-bottom: 1px;
}

.my-subtitle-fs {
   font-size: 14px;
}

.inactive-offer {
   opacity: 80%;
}

.inactive-title {
   font-size: 16px;
   opacity: 90%;
}
</style>
