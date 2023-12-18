<template>
   <payment-layout>
      <v-sheet class='mx-auto pa-2 pb-3 rounded-lg border-custom'>
         <v-list-item>
            <template v-slot:prepend>
               <v-container class='pa-0'>
                  <v-list-item-title class='py-2'>
                     <v-menu>
                        <template v-slot:activator="{ props }">
                           <v-btn
                              dark
                              v-bind="props"
                              class='pa-0 h-auto text-capitalize text-h6'
                              elevation='0'
                           >
                              Доставка <v-icon size='25' icon="mdi mdi-chevron-down"></v-icon>
                           </v-btn>
                        </template>

                        <v-list>
                           <v-list-item
                              v-for="(item, index) in shippingItems"
                              :key="index"
                              :value='item'
                              @click='() => shippingMethod = item'
                           >
                              <v-list-item-title>{{ item }}</v-list-item-title>
                           </v-list-item>
                        </v-list>
                     </v-menu>
                  </v-list-item-title>
                  <v-list-item-subtitle class='text-subtitle-1 pb-2'>
                     {{ shippingMethod }}
                  </v-list-item-subtitle>
               </v-container>
            </template>
            <template v-slot:append>
               <v-container class='pa-0'>
                  <v-list-item-title class='text-h6 py-2 text-end'>
                     Вартість
                  </v-list-item-title>
                  <v-list-item-subtitle class='text-subtitle-1 pb-2 text-end'>
                     250.00 грн
                  </v-list-item-subtitle>
               </v-container>
            </template>
         </v-list-item>
         <v-form>
            <v-row class='ma-0 pb-0'>
               <v-col cols='12' class='pb-2 pr-2'>
                  <v-btn-toggle
                     mandatory
                     v-model="paymentMethod"
                     class='rounded-t-lg bg-grey-lighten-3 h-100'
                  >
                     <v-btn class='border pa-0' value="googlePay">
                        <v-img class='mt-1' src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png" height='55' width='90'></v-img>
                     </v-btn>

                     <v-btn class='border pa-0' value="applePay">
                        <v-img class='mt-1' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/800px-Apple_Pay_logo.svg.png" height='35' width='90'></v-img>
                     </v-btn>
                  </v-btn-toggle>
               </v-col>

               <v-col cols='12' class='pr-2 text-center'>
                  <google-pay-button
                     v-if="paymentMethod === 'googlePay'"
                     environment="TEST"
                     button-color="white"
                     button-type="buy"
                     :paymentRequest.prop="paymentRequest"
                     @loadpaymentdata="onLoadPaymentData"
                     @error="onError"
                     button-size-mode="fill"
                     class='w-100'
                  ></google-pay-button>
                  <h3 v-else>Apple Pay в розробці</h3>
               </v-col>
            </v-row>
         </v-form>
      </v-sheet>
   </payment-layout>
</template>

<script lang='ts' setup>
import "@google-pay/button-element"
import PaymentLayout from '@/layouts/PaymentLayout.vue'
import {ref} from 'vue'

const shippingItems = ['Нова пошта', 'Укр пошта', 'Самовивіз']

const shippingMethod = ref('Нова пошта')

const paymentMethod = ref('googlePay')

const paymentRequest = {
   apiVersion: 2,
   apiVersionMinor: 0,
   allowedPaymentMethods: [
      {
         type: "CARD",
         parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"]
         },
         tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
               gateway: "example",
               gatewayMerchantId: "exampleGatewayMerchantId"
            }
         }
      }
   ],
   merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant"
   },
   transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US"
   }
}

const onLoadPaymentData = (event: any) => {
   console.log(event.detail)
}

const onError = (event: any) => {
   console.error("error", event.error)
}
</script>

<style lang='scss' scoped>
.border-custom {
   border: 2px solid rgba(128, 128, 128, 0.3);
}

.v-btn-toggle {
   display: flex;
   flex-wrap: wrap;
}

.v-btn {
   flex: 1 0 auto;
}

.v-btn-toggle {
   min-height: 57px;
}
</style>