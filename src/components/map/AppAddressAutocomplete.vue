<template>
   <v-autocomplete
      v-if='false'
      v-model='addressModel'
      v-model:search='searchModel'
      :items='items'
      :loading='loading'
      autocomplete='off'
      item-title='address'
      label='Address'
      prepend-inner-icon='mdi-map-marker-outline'
      :no-filter='true'
      :hide-details='true'
      :return-object='true'
      @update:modelValue='selectHandler'
      @update:search='debounceSearch'
   />
   <v-container class='justify-center pa-0 pb-3'>
      <v-btn
         @click="() => sheet = !sheet"
         class='w-100 mb-4'
         color='primary'
         prepend-icon="mdi-filter-cog"
      >
         Фільтри
      </v-btn>
   </v-container>
   <v-row class='px-2'>
      <v-col
         v-for="farm in filteredFarms"
         cols='4'
      >
         <v-btn
            :key="farm.id"
            @click="searchAddress(farm.address)"
            class='rounded-lg'
            variant='outlined'
         >
            {{ farm.farmName }}
         </v-btn>
      </v-col>
   </v-row>
   <v-bottom-sheet v-model="sheet">
      <v-card
         height='auto'
         class='pa-4 rounded-t-lg'
      >
         <v-chip-group
            v-model="amenities"
            :column='true'
            :multiple='true'
         >
            <v-chip
               v-for='category in categories'
               :key='category'
               :filter='true'
               variant="outlined"
               :value='category'
            >
               {{ category }}
            </v-chip>
         </v-chip-group>
      </v-card>
   </v-bottom-sheet>
</template>

<script lang='ts' setup>
import {ref, watch} from 'vue'
import * as debounce from 'lodash.debounce'
import type {AddressItem} from '@/services/map'
import {mapService} from '@/services/map'

interface Farm {
   id: number,
   farmName: string,
   address: string,
   category: string
}

const amenities = ref([])

const farms = ref<Farm[]>([
   {id: 1, farmName: 'Ферма 1', address: 'Рєпіна 3', category: 'Абрикос'},
   {id: 2, farmName: 'Ферма 2', address: 'Рєпіна 2', category: 'Агрус'},
   {id: 3, farmName: 'Ферма 3', address: 'Рєпіна 4', category: 'Баклажан'},
   {id: 4, farmName: 'Ферма 4', address: 'Рєпіна 5', category: 'Диня'},
])

const filteredFarms = ref<Farm[]>([])

watch(amenities, () => {
   if(amenities.value.length !== 0) {
      filteredFarms.value = farms.value.filter(farm => amenities.value.includes(farm.category))
   } else {
      filteredFarms.value = farms.value
   }
}, { immediate: true })

const categories = ['Абрикос', 'Агрус', 'Баклажан', 'Диня']

const sheet = ref(false)

const emit = defineEmits<{
   (e: 'select', address: AddressItem): void
}>()

const map = mapService()
const loading = ref<boolean>(false)
const addressModel = ref<AddressItem | null>(null)
const searchModel = ref<string | null>(null)
const items = ref<AddressItem[]>([])
const debounceSearch = debounce(search, 1000)

function selectHandler(event: AddressItem): void {
   emit('select', event)
}

async function search(value: string | null): Promise<void> {
   try {
      loading.value = true
      const searchValue: string = value?.trim() || ''
      if (!searchValue) {
         items.value = []
         loading.value = false
         return
      }
      items.value = await map.searchAddresses(searchValue)
      loading.value = false
   } catch (e) {
      console.error(e)
      items.value = []
      loading.value = false
   }
}

async function searchAddress(address: string) {
   await search(address)
   selectHandler(items.value[0])
}
</script>

<style lang='scss' scoped>
.v-col {
   padding: 6px;
}
</style>