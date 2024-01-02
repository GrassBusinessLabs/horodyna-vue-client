<template>
   <map-layout>
      <app-map />
      <v-slide-group
         v-if='filters.length'
         class='px-2 align-center position-fixed filters-block rounded-xl'
      >
         <v-chip
            v-for="(filter, index) in filters"
            :key="filter"
            :closable='true'
            class='mr-2'
            @click:close="removeFilter(index)"
         >
            {{ filter }}
         </v-chip>
      </v-slide-group>
      <v-btn
         @click="() => sheet = !sheet"
         icon="mdi-filter-cog"
         class='position-fixed filter-btn'
      >
      </v-btn>
      <v-bottom-sheet v-model="sheet">
         <v-card
            height='550'
            class='pa-0 rounded-t-lg app-item-color'
         >
            <v-card-title class='py-6 text-center my-border card-title'>
               Фільтри
               <v-icon size='27' icon="mdi-filter-cog"></v-icon>
            </v-card-title>
            <v-slide-group
               v-if='filters.length'
               class='px-5 pt-5 pb-3 align-center'
            >
               <v-chip
                  v-for="(filter, index) in filters"
                  :key="filter"
                  :closable='true'
                  class='mr-2'
                  @click:close="removeFilter(index)"
               >
                  {{ filter }}
               </v-chip>
            </v-slide-group>
            <v-list
               :lines="'two'"
               class='pa-5 pb-2 bg-transparent'
               :class="{'pt-0': filters.length}"
            >
               <v-list-item
                  v-for="product in sortedCategory"
                  :key="product.id"
                  :title="product.name"
                  :prepend-avatar="product.img"
                  class='pa-0 pl-4 pr-2 rounded-xl mb-3 app-bg-color-form'
               >
                  <template v-slot:append>
                     <v-checkbox
                        v-model="filters"
                        :value="product.name"
                        hide-details
                        color='indigo'
                     ></v-checkbox>
                  </template>
               </v-list-item>
            </v-list>
         </v-card>
      </v-bottom-sheet>
      <v-bottom-sheet v-model="showFarmDetails">
         <v-card
            height='560'
            class='pa-0 rounded-t-lg app-item-color'
         >
            <v-card-title class='py-4 text-center my-border my-title'>
               {{ selectedFarm.name }}
               <v-list-item-subtitle class='my-subtitle pt-2 pb-1'>
                  Адреса: {{ selectedFarm.address }}
               </v-list-item-subtitle>
            </v-card-title>
            <v-list class='pa-5 pb-2 bg-transparent'>
               <v-list-item
                  v-for="product in selectedFarm.products"
                  :key="product.id"
                  class='pa-3 app-bg-color-form rounded-xl mb-3'
               >
                  <template v-slot:prepend>
                     <v-avatar size="50" :image="product.image"></v-avatar>
                  </template>
                  <v-list-item-title class='my-font-size my-color mb-1'>
                     {{ product.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class='my-subtitle-fs my-color'>
                     {{ product.price }} грн за кг
                  </v-list-item-subtitle>
                  <template v-slot:append>
                     <v-icon
                        icon="mdi-minus-circle-outline"
                        size='x-large'
                        color='black'
                        @click='cartStore.decreaseProductQuantity(product)'
                     ></v-icon>
                     <v-list-item-subtitle class='my-font-size mx-2 font-weight-bold'>
                        {{ cartStore.getCurrentProductQuantity(product) ? `${cartStore.getCurrentProductQuantity(product)} кг` : 0 }}
                     </v-list-item-subtitle>
                     <v-icon
                        icon="mdi-plus-circle-outline"
                        size='x-large'
                        color='black'
                        @click='addProduct(product)'
                     ></v-icon>
                  </template>
               </v-list-item>
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </map-layout>
</template>

<script lang='ts' setup>
import {LngLatLike, Marker} from '@tomtom-international/web-sdk-maps'
import {AddressItem, mapService} from '@/services/map'
import MapLayout from '@/layouts/MapLayout.vue'
import AppMap from '@/components/AppMap.vue'
import {ref, watch} from 'vue'
import { productStore } from '@/stores/product-store.ts'
import {Farm, Product} from '@/models'
import {categoryProducts} from '@/constants/categoryProducts.ts'
import {productsData} from '@/constants/products.ts'
// import {storeToRefs} from 'pinia'
import {useFarmStore} from '@/stores'

interface SelectedFarm extends Farm {
   products: Product[]
}

const farmStore = useFarmStore()
const {populateFarms} = farmStore
// const {farms} = storeToRefs(farmStore)

populateFarms()

const cartStore = productStore()

const map = mapService()

const sortedCategory = productsData.sort((a, b) => a.name.localeCompare(b.name))

const sheet = ref(false)

const showFarmDetails = ref(false)

const filters = ref<string[]>([])

const removeFilter = (index: number) => {
   filters.value = filters.value.slice(0, index).concat(filters.value.slice(index + 1))
}

const farms2 = ref<Farm[]>([
   {id: 1, name: 'Ферма 1', address: 'Рєпіна 7', latitude: 12.21, longitude: 12.21, city: 'Полтава',
      "user": {
         "id": 1,
         "name": "User Name",
         "email": "sa@test.com"
      }
   },
   {id: 2, name: 'Ферма 2', address: 'Рєпіна 9', latitude: 12.21, longitude: 12.21, city: 'Полтава',
      "user": {
         "id": 1,
         "name": "User Name",
         "email": "sa@test.com"
      }
   },
   {id: 3, name: 'Ферма 3', address: 'Рєпіна 8', latitude: 12.21, longitude: 12.21, city: 'Полтава',
      "user": {
         "id": 1,
         "name": "User Name",
         "email": "sa@test.com"
      }
   },
])

const selectedFarm = ref<Partial<SelectedFarm>>({})

watch(filters, async () => {
   map.removeAllMarkers()
   for (const farm of farms2.value) {
      const farmProducts = categoryProducts.filter(product => product.farm_id === farm.id)
      if (filters.value.length === 0 || farmProducts.some((product: Product) => filters.value.some(filter => product.title.includes(filter)))) {
         const addressItems = await map.searchAddresses(farm.address)
         if (addressItems.length > 0) {
            const onClick = () => {
               selectedFarm.value = {
                  ...farm,
                  products: farmProducts
               }
               showFarmDetails.value = true
            }
            const marker: Marker | null = map.createMarker(farm.id.toString(), addressItems[0].details.position as LngLatLike, onClick)
            if (marker) {
               map.addMarkerToMap(marker)
            }
         }
      }
   }
}, { immediate: true })

const addProduct = (product: Product) => {
   cartStore.addProductToCart({
      ...product,
      selectedQuantity: 1,
   })
}

const mapZoom: number = 15
const duration: number = 500

async function selectAddress(address: AddressItem): Promise<void> {
   map.setMapCenter(address.details.position as LngLatLike, {duration})

   if (mapZoom !== map.getMapZoom()) {
      await new Promise(resolve => setTimeout(resolve, duration))
      map.setZoom(15, {duration})
   }
}

const selectedProduct = cartStore.selectedProduct

watch(selectedProduct, async () => {
   if(Object.keys(selectedProduct).length) {
      for (const farm of farms2.value) {
         const farmProducts = categoryProducts.filter(product => product.farm_id === farm.id)
         if (farmProducts.some(product => product.title === selectedProduct.title)) {
            selectedFarm.value = farm
            const addressItems = await map.searchAddresses(selectedProduct.address)
            if (addressItems.length > 0) {
               await selectAddress(addressItems[0])
            }
            break
         }
      }
   }
   cartStore.selectedProduct = {}
}, { immediate: true })
</script>

<style lang='scss' scoped>
.filter-btn {
   bottom: 80px;
   right: 12px;
}

.card-title {
   font-size: 28px;
}

.v-slide-group {
   height: 100px;

   .v-chip {
      font-size: 16px;
   }
}

.filters-block {
   height: 48px;
   background-color: white;
   bottom: 80px;
   left: 12px;
   right: 72px;
   box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
</style>
