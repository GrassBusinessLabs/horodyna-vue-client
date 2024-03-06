<template>
  <div class="text-center">
    <v-btn v-if="!isMenuButton" :block='true' @click="isOpen = true" class='app-color pb-0 rounded-lg' variant='flat'>
      Ввести
    </v-btn>
    <v-list-item-subtitle v-else-if="userAddress" class='my-font-size text-start py-1'>{{ userAddress.department
      }} ({{ userAddress.name }})</v-list-item-subtitle>
    <v-list-item-subtitle v-else @click="goToSetUserAddress" class='my-font-size text-start'>Вкажіть ваше місто <v-icon
        size="21" icon="mdi-alert-circle"></v-icon></v-list-item-subtitle>

    <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
      :initial-breakpoint="0.6">
      <ion-content style="--background: transparent">
        <v-card class="text-center rounded-t-lg" height="600">
          <v-card-title class='py-4 text-center my-card-title address-search'>
            {{ isShowDepartmentsList ? 'Введення відділення' : 'Введення міста' }}
          </v-card-title>
          <template v-if="!isShowDepartmentsList">
            <v-autocomplete class="ma-5" v-model='addressModel' v-model:search='searchModel' :items='items'
              :loading='loading' autocomplete='off' item-title='city' label='Введіть назву міста'
              prepend-inner-icon='mdi-map-marker-outline' :no-filter='true' :hide-details='true' :return-object='true'
              @update:modelValue='selectHandler' @update:search='debounceSearch' />
            <v-card-text class="pa-5 pt-1 mx-2 d-flex justify-center">
              <v-btn @click="addressModel = null" class='w-50 rounded-lg mr-4' color="indigo" variant='outlined'>
                Очистити
              </v-btn>
              <v-btn @click="searchDepartmentsByCity" class='app-color w-50 rounded-lg' variant='flat'>
                Знайти
              </v-btn>
            </v-card-text>
          </template>

          <template v-else>
            <v-sheet class="pa-5 pt-3">
              <ion-select v-model="temporaryDepartment" aria-label="Відділення" interface="action-sheet"
                placeholder="Оберіть відділення">
                <ion-select-option v-for="department in mailDepartments" :key="department.SiteKey"
                  :value="department.Description">{{ department.Description }}</ion-select-option>
              </ion-select>
              <v-card-text class="px-2 pt-1 d-flex justify-center">
                <v-btn @click="isOpen = false" class='w-50 rounded-lg mr-4' color="indigo" variant='outlined'>
                  Скасувати
                </v-btn>
                <v-btn @click="createAddress" class='app-color w-50 rounded-lg' variant='flat'>
                  Зберегти
                </v-btn>
              </v-card-text>
            </v-sheet>
          </template>
        </v-card>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang='ts' setup>
import { Address } from '@/models'
import { requestService } from '@/services'
import { CityItem, mapService } from '@/services/map'
import { useUserStore } from '@/stores'
import { IonContent, IonModal, IonSelect, IonSelectOption } from '@ionic/vue'
import { LngLatLike } from '@tomtom-international/web-sdk-maps'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { defineEmits, ref, watch } from 'vue'

defineProps<{
  isMenuButton?: boolean,
  userAddress?: Address
}>()

const emit = defineEmits<{
  (e: 'select', address: CityItem): void
  (e: 'closeMenu'): void
  (e: 'getAddresses', department: string): void
}>()

const request = requestService()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const map = mapService()

const allMailDepartments = ref()
const mailDepartments = ref()
const temporaryDepartment = ref()

const getNovaPoshtaBranches = async (city: string) => {
  const apiKey = 'b486fb3c157ea832c9aa2f2b7c406dec'
  const apiUrl = 'https://api.novaposhta.ua/v2.0/json/'

  const requestBody = {
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: city.replace("Міста", "").trim(),
    },
    apiKey: apiKey
  }

  try {
    const response = await axios.post(apiUrl, requestBody)
    if (response.data.success) {
      allMailDepartments.value = response.data.data

      mailDepartments.value = response.data.data.filter((item: any) => item.CategoryOfWarehouse === 'Branch')
    } else {
      console.log('Помилка при отриманні даних:', response.data.errors)
    }
  } catch (error) {
    console.error('Помилка при виконанні запросу:', error)
  }
}

const searchDepartmentsByCity = () => {
  if (addressModel.value) {
    getNovaPoshtaBranches(addressModel.value.city)

    isShowDepartmentsList.value = true
  }
}

const isOpen = ref(false)

const isShowDepartmentsList = ref(false)

const loading = ref<boolean>(false)
const addressModel = ref<CityItem | null>(null)
const searchModel = ref<string>('')
const items = ref<CityItem[]>([])

const debounceSearch = debounce(search, 200)

watch(isOpen, () => {
  if (!isOpen.value) {
    addressModel.value = null
    isShowDepartmentsList.value = false
  }
})

function selectHandler(event: CityItem): void {
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

    items.value = await map.searchCities(searchValue)
    if (items.value[0].details.position != undefined) {
      const position: LngLatLike = {
        lat: Number(items.value[0].details.position.lat),
        lng: Number(items.value[0].details.position.lng)
      }
      const ttmap = map.getMap()
      ttmap?.setCenter(position)
    }
    loading.value = false
  } catch (e) {
    console.error(e)
    items.value = []
    loading.value = false
  }
}

const modalDismissed = () => {
  isOpen.value = false
}

const createAddress = async () => {
  if (addressModel.value?.city && temporaryDepartment.value) {
    const body = {
      user_id: currentUser.value?.id ? currentUser.value.id : -1,
      title: 'User title',
      city: addressModel.value.city,
      department: temporaryDepartment.value,
      country: 'User country',
      address: 'User address',
      lat: 1,
      lon: 1
    }
    await request.createAddress(body)
    emit('getAddresses', temporaryDepartment.value)
    isOpen.value = false
  }
}

const goToSetUserAddress = () => {
  isOpen.value = true
  emit('closeMenu')
}
</script>

<style lang='scss' scoped>
ion-select {
   font-size: 19px;
   margin-bottom: 7px;
}
</style>