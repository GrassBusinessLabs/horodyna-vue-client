<template>
  <div class="text-center">
     <button @click="isOpen = true" class="my-btn">
        <img src="https://cdn-icons-png.flaticon.com/512/1167/1167055.png" alt="lupe">
     </button>

     <ion-modal style="--background: transparent" :is-open="isOpen" @ionModalDidDismiss="modalDismissed"
        :initial-breakpoint="0.5">
        <ion-content style="--background: transparent">
           <v-card class="text-center rounded-t-lg" height="500">
              <v-card-title class='py-4 text-center my-card-title'>
                 Пошук адреси
              </v-card-title>
              <v-card-text class="pa-5">
                 <v-autocomplete v-model='addressModel' v-model:search='searchModel' :items='items' :loading='loading'
                    autocomplete='off' item-title='address' :label='translate("INPUTS.ADDRESS")'
                    prepend-inner-icon='mdi-map-marker-outline' :no-filter='true' :hide-details='true'
                    :return-object='true' @update:modelValue='selectHandler' @update:search='debounceSearch' />
                 <v-btn @click="addressModel = null" :block='true' class='app-color mt-5' variant='flat'>
                    Очистити
                 </v-btn>
              </v-card-text>
           </v-card>
        </ion-content>
     </ion-modal>
  </div>
</template>

<script lang='ts' setup>
import { useAppI18n } from '@/i18n'
import type { AddressItem } from '@/services/map'
import { mapService } from '@/services/map'
import { IonContent, IonModal } from '@ionic/vue'
import { LngLatLike } from '@tomtom-international/web-sdk-maps'
import debounce from 'lodash.debounce'
import { defineEmits, ref } from 'vue'

const emit = defineEmits<{
  (e: 'select', address: AddressItem): void
}>()

const { translate } = useAppI18n()

const map = mapService()

const isOpen = ref(false)

const loading = ref<boolean>(false)
const addressModel = ref<AddressItem | null>(null)
const searchModel = ref<string>('')
const items = ref<AddressItem[]>([])

const debounceSearch = debounce(search, 200)

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
</script>

<style lang='scss' scoped>
.my-btn {
  border: 2px solid rgb(185, 185, 185);
  // bottom: 72px;
  z-index: 50;
  width: 43px;
  height: 43px;
  background-color: #fff;
  border-radius: 10px;

  img {
     margin-top: 6px;
     height: 25px;
     width: 25px;
  }
}
</style>