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
      <v-bottom-sheet v-model="showFarmDetails">
         <v-card
            height='550'
            class='pa-0 rounded-t-lg'
         >
            <v-card-title class='py-4 text-center text-white text-h5'>
               {{ selectedFarm.name }}
               <p class='text-h6 text-grey-lighten-2'>Адреса: {{ selectedFarm.address }}</p>
            </v-card-title>
            <v-list lines="two" class='pa-0 pt-1 px-4'>
               <v-list-item
                  v-for="product in selectedFarm.products"
                  :key="product.id"
                  :title="product.name"
                  :prepend-avatar="product.img"
                  class='pa-0 my-border'
               >
                  <v-list-item-subtitle class='text-subtitle-1'>
                     {{ `Ціна: ${product.price} грн за кг` }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                     <v-icon
                        icon="mdi-plus-box-outline"
                        size='large'
                        color='black'
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
import {mapService} from '@/services/map'
import MapLayout from '@/layouts/MapLayout.vue'
import AppMap from '@/components/AppMap.vue'
import {ref, watch} from 'vue'
import {productsData} from '@/constants/products.ts'

const map = mapService()

interface Location {
   id: number,
   name: string,
   address: string,
   category: string,
   products: Product[]
}

interface Product {
   productId: string,
   name: string,
   price: number,
   img: string,
}

const sortedCategory = productsData.sort((a, b) => a.name.localeCompare(b.name))

const sheet = ref(false)

const showFarmDetails = ref(false)

const filters = ref<string[]>([])

const farms = ref<Location[]>([
   {id: 1, name: 'Ферма 1', address: 'Рєпіна 1', category: 'Абрикос', products: [
         {productId: 'p1', name: 'Абрикос 1', price: 50, img: 'https://knip.com.ua/content/images/1/480x463l50nn0/abrikos-viroslava-96346870734276.png'},
         {productId: 'p2', name: 'Агрус 1', price: 40, img: 'https://images.unian.net/photos/2023_07/thumb_files/1000_545_1689936883-1538.jpg?1'}
      ]
   },
   {id: 2, name: 'Ферма 2', address: 'Рєпіна 5', category: 'Баклажан', products: [
         {productId: 'p3', name: 'Груша 1', price: 30, img: 'https://klopotenko.com/wp-content/uploads/2022/08/fruits-ga2c37054b_1920.jpg'},
         {productId: 'p4', name: 'Баклажан 1', price: 60, img: 'https://ss.sport-express.ru/userfiles/materials/189/1899896/volga.jpg'}
      ]
   },
   {id: 3, name: 'Ферма 3', address: 'Рєпіна 6', category: 'Диня', products: [
         {productId: 'p5', name: 'Диня 1', price: 70, img: 'https://dobrodar.ua/uploads/files/Products/Product_images_40452/4e5ff2.jpg'},
         {productId: 'p6', name: 'Груша 2', price: 40, img: 'https://gradinamax.com.ua/uploads/catalog_products/grusha-medovaya_1.jpg'}
      ]
   },
])

const selectedFarm = ref()

watch(filters, async () => {
   map.removeAllMarkers()
   for (const farm of farms.value) {
      if (filters.value.length === 0 || farm.products.some(product => filters.value.some(filter => product.name.includes(filter)))) {
         const addressItems = await map.searchAddresses(farm.address)
         if (addressItems.length > 0) {
            const onClick = () => {
               selectedFarm.value = farm
               showFarmDetails.value = true
            }
            const marker: Marker | null = map.createMarker(farm.id, addressItems[0].details.position as LngLatLike, onClick)
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
