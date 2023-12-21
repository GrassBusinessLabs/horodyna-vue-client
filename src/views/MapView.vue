<template>
   <map-layout>
      <app-map />
      <v-btn
         @click="() => sheet = !sheet"
         icon="mdi-filter-cog"
         class='position-fixed filter-btn'
      >
      </v-btn>
      <v-bottom-sheet v-model="sheet">
         <v-card
            height='550'
            class='pa-0 rounded-t-lg'
         >
            <v-card-title class='py-7 text-center text-white text-h5'>
               Фільтри
            </v-card-title>
            <v-list lines="two" class='pa-0 pt-1 px-4'>
               <v-list-item
                  v-for="product in sortedCategory"
                  :key="product.id"
                  :title="product.name"
                  :prepend-avatar="product.img"
                  class='pa-0 my-border'
               >
                  <template v-slot:append>
                     <v-checkbox
                        v-model="filters"
                        :value="product.name"
                        hide-details
                        color='primary'
                     ></v-checkbox>
                  </template>
               </v-list-item>
            </v-list>
         </v-card>
      </v-bottom-sheet>
   </map-layout>
</template>

<script lang='ts' setup>
import {LngLatLike, Marker} from '@tomtom-international/web-sdk-maps'
import {mapService} from '@/services/map'
import MapLayout from '@/layouts/MapLayout.vue'
import AppMap from '@/components/AppMap.vue'
import {ref, watch} from 'vue'
import {productsData} from '@/constants/products.ts'

const map = mapService()

interface Location {
   id: number,
   address: string,
   category: string
}

const sortedCategory = productsData.sort((a, b) => a.name.localeCompare(b.name))

const sheet = ref(false)

const filters = ref<string[]>([])

const locations = ref<Location[]>([
   {id: 1, address: 'Рєпіна 1', category: 'Абрикос'},
   {id: 2, address: 'Рєпіна 5', category: 'Баклажан'},
   {id: 3, address: 'Рєпіна 6', category: 'Диня'},
])

watch(filters, async () => {
   map.removeAllMarkers()
   for (const location of locations.value) {
      if (filters.value.length === 0 || filters.value.includes(location.category)) {
         const addressItems = await map.searchAddresses(location.address)
         if (addressItems.length > 0) {
            const marker: Marker | null = map.createMarker(location.id, addressItems[0].details.position as LngLatLike)
            if (marker) {
               map.addMarkerToMap(marker)
            }
         }
      }
   }
}, { immediate: true })
</script>

<style lang='scss' scoped>
.filter-btn {
   bottom: 80px;
   right: 12px;
}

.my-border {
   border-bottom: 2px solid rgba(128, 128, 128, 0.4);
}

.my-border:last-child {
   border: none;
}

.v-card-title {
   background-color: #135DD8;
}
</style>
