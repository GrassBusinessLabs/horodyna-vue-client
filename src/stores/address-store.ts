import { useHandleError } from '@/composables'
import { Address, AddressResponse } from '@/models'
import { requestService } from '@/services'
import { defineStore, storeToRefs } from 'pinia'
import { Ref, ref } from 'vue'
import { useUserStore } from './user-store'

export const useAddressStore = defineStore('address', () => {
   const { handleError } = useHandleError()
   const request = requestService()
   const addresses: Ref<Address[] | null> = ref<Address[] | null>(null)

   function setAddresses(value: Address[] | null): void {
      addresses.value = value
   }

   async function getAddresssData(): Promise<void> {
      try {
         const addressesData: AddressResponse = await request.getAddresses()
         setAddresses(addressesData.items)
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }

   async function populateAddresses(): Promise<void> {
      try {
         await getAddresssData()
      } catch (e) {
         console.error(e)
         handleError(e)
      }
   }

   function getUserAddress(): string | undefined {
      const userStore = useUserStore()
      const { currentUser } = storeToRefs(userStore)

      const foundedAddress = addresses.value?.find(address => address.user.id === currentUser.value?.id)
      return foundedAddress?.address
   }

   return {
      populateAddresses,
      getUserAddress
   }
})
