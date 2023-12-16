import {useToastDialog} from '@/composables/toast'
import {utilsService} from '@/services'
import {useUserStore} from '@/stores'

export const useHandleError = () => {
   const toastDialog = useToastDialog()
   const userStore = useUserStore()
   const {logout} = userStore

   const utils = utilsService()

   const tokenExpiredMsg: string = 'token is expired'

   function handleError(error: any): void {
      const errorMsg: string = utils.getErrorMessage(error)

      if (errorMsg === tokenExpiredMsg) {
         logout()
         toastDialog.info('Errors session is expired')
         return
      }

      toastDialog.error(errorMsg)
   }

   return {
      handleError
   }
}
