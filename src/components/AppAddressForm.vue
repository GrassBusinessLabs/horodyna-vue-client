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
          <v-card-title class='py-5 text-center my-card-title address-search d-flex align-center justify-center'>
            Введення відділення <img class="mail-image"
               src='https://play-lh.googleusercontent.com/mtyOm0Rp0PeG_BWE7M5j9gBWuU1Du34LLj-dLdSE1-006_BkFg32W3Cca00l2BBvNM0'>
          </v-card-title>
          <v-autocomplete density="compact" class="ma-5" v-model='addressModel' v-model:search='searchModel'
            :items='items' :loading='loading' autocomplete='off' item-title='Description' label='Введіть назву міста'
            prepend-inner-icon='mdi-map-marker' :no-filter='true' :hide-details='true' :return-object='true'
            @update:modelValue='selectHandler' @update:search='debounceSearch' />
          <v-sheet class="pr-10">
            <ion-select justify="start" label="" v-model="temporaryDepartment" aria-label="Відділення"
              interface="action-sheet" placeholder="Оберіть відділення">
              <ion-select-option v-for="department in mailDepartments" :key="department.SiteKey"
                :value="department.Description">{{ department.Description }}</ion-select-option>
            </ion-select>
          </v-sheet>
          <v-card-text class="pa-5 pt-1 mx-2 d-flex justify-center">
            <v-btn @click="addressModel = null" class='w-50 rounded-lg mr-4' color="indigo" variant='outlined'>
              Очистити
            </v-btn>
            <v-btn @click="createAddress" class='app-color w-50 rounded-lg' variant='flat'>
              Зберегти
            </v-btn>
          </v-card-text>
        </v-card>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang='ts' setup>
import { Address, CreateAddress } from '@/models'
import { requestService } from '@/services'
import { CityItem } from '@/services/map'
import { useUserStore } from '@/stores'
import { IonContent, IonModal, IonSelect, IonSelectOption } from '@ionic/vue'
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
  (e: 'getAddresses', department: string, city: string, cityRef: string): void
}>()

const request = requestService()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const allMailDepartments = ref()
const mailDepartments = ref()
const temporaryDepartment = ref()

const mailCities = ref()

const getNovaPoshtaBranches = async (cityRef: string) => {
   const apiKey = 'b486fb3c157ea832c9aa2f2b7c406dec'
   const apiUrl = 'https://api.novaposhta.ua/v2.0/json/'

   const requestBody = {
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
         CityRef: cityRef,
      },
      apiKey: apiKey
   }

   try {
      const response = await axios.post(apiUrl, requestBody)
      if (response.data.success) {
         allMailDepartments.value = response.data.data
         console.log(response.data.data)

         mailDepartments.value = response.data.data.filter((item: any) => item.CategoryOfWarehouse === 'Branch')
      } else {
         console.log('Помилка при отриманні даних:', response.data.errors)
      }
   } catch (error) {
      console.error('Помилка при виконанні запросу:', error)
   }
}

const isOpen = ref(false)

const isShowDepartmentsList = ref(false)

const loading = ref<boolean>(false)
const addressModel = ref<CityItem | null>(null)
const searchModel = ref<string>('')
const items = ref<CityItem[]>([])

const debounceSearch = debounce(search, 200)

const getNovaPoshtaCities = async () => {
   const apiKey = 'b486fb3c157ea832c9aa2f2b7c406dec'
   const apiUrl = 'https://api.novaposhta.ua/v2.0/json/'

   const requestBody = {
      modelName: 'Address',
      calledMethod: 'getCities',
      apiKey: apiKey
   }

   try {
      const response = await axios.post(apiUrl, requestBody)
      if (response.data.success) {
         mailCities.value = response.data.data
         return response.data.data
      } else {
         console.log('Помилка при отриманні даних:', response.data.errors)
      }
   } catch (error) {
      console.error('Помилка при виконанні запросу:', error)
   }
}

watch(isOpen, async () => {
  if (!isOpen.value) {
    addressModel.value = null
    temporaryDepartment.value = null
    isShowDepartmentsList.value = false
  } else {
    !mailCities.value && await getNovaPoshtaCities()
  }
})

function selectHandler(event: CityItem): void {
  emit('select', event)
}

watch(addressModel, async () => {
   if (addressModel.value?.Ref) {
      getNovaPoshtaBranches(addressModel.value?.Ref)
   }
})

async function search(value: string | null): Promise<void> {
   const searchValue: string = value?.trim() || ''
   items.value = await mailCities.value.filter((city: any) => city.Description.includes(searchValue) && city.SettlementTypeDescription === 'місто' && !city.Description.includes('('))
}

const modalDismissed = () => {
  isOpen.value = false
}

const createAddress = async () => {
  if (addressModel.value?.Description && temporaryDepartment.value) {
    const body: CreateAddress = {
      user_id: currentUser.value?.id ? currentUser.value.id : -1,
      name: addressModel.value.Description,
      city_ref: addressModel.value.Ref,
      city: addressModel.value.Description,
      department: temporaryDepartment.value,
      country: 'country',
      address: 'address',
      lat: 1,
      lon: 1
    }
    await request.createAddress(body)
    modalDismissed()
    emit('getAddresses', temporaryDepartment.value, addressModel.value.Description, addressModel.value.Ref)
  }
}

const goToSetUserAddress = () => {
  isOpen.value = true
  emit('closeMenu')
}
</script>

<style lang='scss' scoped>
ion-select {
   font-size: 16px;
   margin-bottom: 16px;
   margin-left: 21px;
   --background: rgb(247, 247, 247);
   border-bottom: 1px solid rgb(150, 150, 150);
   --padding-end: 20px;
}

.mail-image {
   width: 28px;
   height: 28px;
   border-radius: 5px;
   margin-left: 8px;
}
</style>