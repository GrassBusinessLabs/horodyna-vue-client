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
            class='pa-0 rounded-t-lg app-item-color'
         >
            <v-card-title class='py-6 text-center my-border card-title'>
               Фільтри
               <v-icon size='27' icon="mdi-filter-cog"></v-icon>
            </v-card-title>
            <v-list :lines="'two'" class='pa-5 pb-2 bg-transparent'>
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
                  Адреса: {{ selectedFarm.farmAddress }}
               </v-list-item-subtitle>
            </v-card-title>
            <v-list class='pa-5 pb-2 bg-transparent'>
               <v-list-item
                  v-for="product in selectedFarm.products"
                  :key="product.productId"
                  class='pa-3 app-bg-color-form rounded-xl mb-3'
               >
                  <template v-slot:prepend>
                     <v-avatar size="50" :image="product.img"></v-avatar>
                  </template>
                  <v-list-item-title class='my-font-size my-color mb-1'>
                     {{ product.name }}
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
import {productsData} from '@/constants/products.ts'
import { productStore } from '@/stores/product-store.ts'
import {Farm, Product} from '@/models'

const cartStore = productStore()

const map = mapService()

const sortedCategory = productsData.sort((a, b) => a.name.localeCompare(b.name))

const sheet = ref(false)

const showFarmDetails = ref(false)

const filters = ref<string[]>([])

const farms = ref<Farm[]>([
   {id: 'f1', name: 'Ферма 1', farmAddress: 'Рєпіна 7', category: 'Абрикос', products: [
         {productId: 'p1', name: 'Абрикос 1', price: 50, img: 'https://knip.com.ua/content/images/1/480x463l50nn0/abrikos-viroslava-96346870734276.png', category: 'Фрукти', author: 'Андрій', address: 'Рєпіна 7'},
         {productId: 'p3', name: 'Агрус 1', price: 40, img: 'https://images.unian.net/photos/2023_07/thumb_files/1000_545_1689936883-1538.jpg?1', category: 'Ягоди', author: 'Андрій', address: 'Рєпіна 7'}
      ]
   },
   {id: 'f2', name: 'Ферма 2', farmAddress: 'Рєпіна 9', category: 'Баклажан', products: [
         {productId: 'p2', name: 'Груша 1', price: 30, img: 'https://klopotenko.com/wp-content/uploads/2022/08/fruits-ga2c37054b_1920.jpg', category: 'Фрукти', author: 'Андрій', address: 'Рєпіна 9'},
         {productId: 'p4', name: 'Баклажан 1', price: 60, img: 'https://ss.sport-express.ru/userfiles/materials/189/1899896/volga.jpg', category: 'Овочі', author: 'Андрій', address: 'Рєпіна 9'}
      ]
   },
   {id: 'f3', name: 'Ферма 3', farmAddress: 'Рєпіна 8', category: 'Диня', products: [
         {productId: 'p5', name: 'Диня 1', price: 70, img: 'https://dobrodar.ua/uploads/files/Products/Product_images_40452/4e5ff2.jpg', category: 'Фрукти', author: 'Андрій', address: 'Рєпіна 8'},
         {productId: 'p6', name: 'Груша 2', price: 40, img: 'https://gradinamax.com.ua/uploads/catalog_products/grusha-medovaya_1.jpg', category: 'Фрукти', author: 'Андрій', address: 'Рєпіна 8'}
      ]
   },
])

const selectedFarm = ref<Partial<Farm>>({})

watch(filters, async () => {
   map.removeAllMarkers()
   for (const farm of farms.value) {
      if (filters.value.length === 0 || farm.products.some((product: Product) => filters.value.some(filter => product.name.includes(filter)))) {
         const addressItems = await map.searchAddresses(farm.farmAddress)
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

const addProduct = (product: Product) => {
   cartStore.addProductToCart({
      ...product,
      selectedQuantity: 1,
      sum: product.price
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
      for (const farm of farms.value) {
         if (farm.products.some(product => product.name === selectedProduct.name)) {
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
</style>
