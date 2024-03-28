<template>
   <profile-layout>
      <v-sheet>
         <div class="image-block d-flex justify-center">
            <img class="user-avatar" alt="Product image"
               src="https://companynewheroes.com/wp-content/blogs.dir/18/files/2019/09/Lucas-De-Man-Fotograaf-Anne-Harbers-2-1024x683.jpg">
         </div>
      </v-sheet>
   </profile-layout>
</template>

<script lang='ts' setup>
import { useRouting } from '@/composables'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import { UpdateOrder } from '@/models'
import { CityItem, requestService } from '@/services'
import { useCartStore, useOfferStore, useOrderStore, useUserStore } from '@/stores'
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const request = requestService()

const routing = useRouting()

const cartStore = useCartStore()
const { setCart } = cartStore
const { cart } = storeToRefs(cartStore)

const orderStore = useOrderStore()
const { populateOrders } = orderStore
const { selectedOrder } = storeToRefs(orderStore)

const offerStore = useOfferStore()
const { getOfferById } = offerStore

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const orderDepartment = ref<string | undefined>()
const orderCity = ref<string | undefined>()
const orderCityRef = ref<string | undefined>()

const allMailDepartments = ref()
const mailDepartments = ref()

const mailCities = ref()

const selectedDepartment = ref()
const temporaryDepartment = ref()

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

onIonViewWillEnter(async () => {
   await setCart()
   const departmentResponse = await request.getAddressByUserId(currentUser.value?.id ? currentUser.value.id : -1)
   await getNovaPoshtaBranches(departmentResponse.city_ref)
   await getNovaPoshtaCities()
   orderDepartment.value = departmentResponse.department
   orderCity.value = departmentResponse.name
   orderCityRef.value = departmentResponse.city_ref
})

onIonViewWillLeave(async () => {
   selectedDepartment.value = null
})

const isOpen = ref(false)

const loading = ref<boolean>(false)
const addressModel = ref<CityItem | null>(null)
const searchModel = ref<string>('')
const items = ref<CityItem[]>([])

const debounceSearch = debounce(search, 200)

watch(isOpen, async () => {
   if (isOpen.value) {
      addressModel.value = {
         Description: orderCity.value,
         Ref: orderCityRef.value
      }
      temporaryDepartment.value = orderDepartment.value
   }
})

watch(addressModel, async () => {
   if (addressModel.value?.Ref) {
      getNovaPoshtaBranches(addressModel.value?.Ref)
   }
})

const emit = defineEmits<{
   (e: 'select', address: CityItem): void
}>()

function selectHandler(event: CityItem): void {
   emit('select', event)
}

async function search(value: string | null): Promise<void> {
   const searchValue: string = value?.trim() || ''
   items.value = await mailCities.value.filter((city: any) => city.Description.includes(searchValue) && city.SettlementTypeDescription === 'місто' && !city.Description.includes('('))
}

const modalDismissed = () => {
   isOpen.value = false
}

const changeOrderDepartment = () => {
   if (addressModel.value) {
      getNovaPoshtaBranches(addressModel.value.Description)

      isOpen.value = false
      orderCity.value = addressModel.value.Description
      selectedDepartment.value = temporaryDepartment.value
   }
}

const getNewAddresses = async (department: string, city: string, cityRef: string) => {
   orderDepartment.value = department
   orderCity.value = city
   getNovaPoshtaBranches(cityRef)
}

const createSubmittedOrder = async () => {
   const newOrder = await request.submitSplittedOrder(cart.value?.id ? cart.value.id : -1, selectedOrder.value ? selectedOrder.value?.order_items[0].farm.id : -1)
   const body: UpdateOrder = {
      order_id: newOrder.id,
      post_office: selectedDepartment.value ? selectedDepartment.value : orderDepartment.value,
      post_office_city: orderCity.value ? orderCity.value : '',
      address: 'Order Address'
   }
   await request.updateOrderDepartment(body)
   await populateOrders()
   routing.toPurchases()
}
</script>

<style lang='scss' scoped>
.v-sheet {
   background: var(--color-bg);
   border-radius: 10px 10px 0 0;
   position: fixed;
   right: 0;
   left: 0;
   bottom: 0;
   top: 118px;
}

.user-avatar {
   width: 120px;
   height: 120px;
   object-fit: cover;
   border-radius: 100%;
   border: 2px solid var(--color-bg);
}

.image-block {
   position: fixed;
   top: 60px;
   right: 0;
   left: 0;
}
</style>