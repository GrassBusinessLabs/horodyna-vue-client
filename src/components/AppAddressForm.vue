<template>
  <div class="text-center">
    <v-btn v-if="!isMenuButton" :block='true' @click="isOpen = true" class='app-color pb-0 rounded-lg' variant='flat'>
      Ввести адресу
    </v-btn>
    <v-list-item-subtitle v-else-if="userAddress" class='my-font-size text-start py-1'>{{ userAddress }}</v-list-item-subtitle>
    <v-list-item-subtitle v-else @click="goToSetUserAddress" class='my-font-size text-start'>Вкажіть вашу адресу <v-icon size="21" icon="mdi-alert-circle"></v-icon></v-list-item-subtitle>

    <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
      :initial-breakpoint="0.6">
      <ion-content style="--background: transparent">
        <v-card class="text-center rounded-t-lg" height="600">
          <v-card-title class='py-4 text-center my-card-title'>
            Введення адреси
          </v-card-title>
          <v-card-text class="pa-5">
            <v-autocomplete v-model='addressModel' v-model:search='searchModel' :items='items' :loading='loading'
              autocomplete='off' item-title='address' label='Введіть свою адресу'
              prepend-inner-icon='mdi-map-marker-outline' :no-filter='true' :hide-details='true' :return-object='true'
              @update:modelValue='selectHandler' @update:search='debounceSearch' />
            <v-btn @click="createAddress" :block='true' class='app-color mt-5 rounded-lg' variant='flat'>
              Зберегти
            </v-btn>
          </v-card-text>
        </v-card>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang='ts' setup>
import { requestService } from '@/services'
import type { AddressItem } from '@/services/map'
import { mapService } from '@/services/map'
import { useAddressStore, useUserStore } from '@/stores'
import { IonContent, IonModal } from '@ionic/vue'
import { LngLatLike } from '@tomtom-international/web-sdk-maps'
import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { defineEmits, ref, watch } from 'vue'

defineProps<{
  isMenuButton?: boolean,
  userAddress?: string
}>()

const emit = defineEmits<{
  (e: 'select', address: AddressItem): void
  (e: 'closeMenu'): void
  (e: 'getAddresses'): void
}>()

const request = requestService()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const addressStore = useAddressStore()
const { populateAddresses } = addressStore

const map = mapService()

const isOpen = ref(false)

const loading = ref<boolean>(false)
const addressModel = ref<AddressItem | null>(null)
const searchModel = ref<string>('')
const items = ref<AddressItem[]>([])

const debounceSearch = debounce(search, 200)

watch(isOpen, () => {
  if (!isOpen.value) {
    addressModel.value = null
  }
})

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
  if (addressModel.value?.address) {
    const body = {
      user_id: currentUser.value?.id ? currentUser.value.id : -1,
      title: 'User title',
      city: 'User city',
      country: 'User country',
      address: addressModel.value.address,
      lat: 1,
      lon: 1
    }
    await request.createAddress(body)
    isOpen.value = false
    await populateAddresses()
    emit('getAddresses')
  }
}

const goToSetUserAddress = () => {
  isOpen.value = true
  emit('closeMenu')
}
</script>

<style lang='scss' scoped></style>