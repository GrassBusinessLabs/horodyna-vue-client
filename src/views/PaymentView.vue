<template>
   <payment-layout>
      <v-sheet class="mx-auto pa-2 pb-3 rounded-lg border-custom">
         <v-list-item>
            <v-container class="pa-0">
               <v-list-item-title class="py-2">
                  <v-menu>
                     <template v-slot:activator="{ props }">
                        <v-btn
                           dark
                           v-bind="props"
                           class="pa-0 h-auto text-h6"
                           elevation="0"
                        >
                           <h5>Доставка</h5>
                           <v-icon size="25" icon="mdi mdi-chevron-down"></v-icon>
                        </v-btn>
<!--                        с-->
                     </template>

                     <v-list>
                        <v-list-item
                           v-for="(item, index) in shippingItems"
                           :key="index"
                           :value="item"
                           @click="updateShippingMethod(item)"
                        >
                           <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                     </v-list>
                  </v-menu>
               </v-list-item-title>
               <v-list-item-subtitle class="text-subtitle-6 pb-2 text-center">
                  <h4>{{ shippingMethod }}</h4>
               </v-list-item-subtitle>
               <v-list-item-subtitle class="text-subtitle-6 pb-2">
                  <h4 v-if="isOrderConfirmed"> </h4>
               </v-list-item-subtitle>
            </v-container>
            <template v-slot:append>
               <v-container class="pa-0">
                  <div class="stat-1">
                     <v-list-item-title class="text-h6 py-2 text-end">
                        <h5>Сума до сплати:</h5>
                        <h5>{{ totalAmountToPay }} грн</h5>
                     </v-list-item-title>
                  </div>
               </v-container>
            </template>
         </v-list-item>
         <v-list-item-subtitle class="text-h6 pb-2 text-center">
            <v-btn
               @click="buyButtonClicked"
               class="rounded-lg bg-primary white--text"
            >
               Купити
            </v-btn>
         </v-list-item-subtitle>

         <div v-if="isOrderConfirmed" class="order-confirmation">
            Статус замовлення:
            <h4>{{ orderStatus }}</h4>
         </div>

         <v-form v-show="isOrderConfirmed">
            <v-row class="ma-0 pb-0">
               <v-col cols="5" class="text-center">
                  <div class="google-pay-button-container">
                     <google-pay-button
                        v-if="paymentMethod === 'googlePay'"
                        environment="TEST"
                        button-color="white"
                        button-type="buy"
                        :paymentRequest.prop="paymentRequest"
                        @loadpaymentdata="onLoadPaymentData"
                        @error="onError"
                        button-size-mode="fill"
                        class="google-pay-button"
                     ></google-pay-button>
                  </div>
               </v-col>
            </v-row>
         </v-form>
<div class ="exit">
         <v-btn
            class="exit"
            @click="goToPurchase"
         >
            Перейти до покупок
         </v-btn>
</div>
      </v-sheet>
   </payment-layout>
</template>

<script setup>
import "@google-pay/button-element";
import PaymentLayout from "@/layouts/PaymentLayout.vue";
import { ref, onMounted } from "vue";
import { productStore } from "@/stores/product-store.ts";
import { useRouter, useRoute } from "vue-router";

const router = useRouter(); // Додано

const shippingItems = ["Нова пошта", "Укр пошта", "Самовивіз"];
const cartStore = productStore();
const shippingMethod = ref("Нова пошта");
const paymentMethod = ref("googlePay");
const totalAmountToPay = ref(0);
const orderStatus = ref("Очікує підтвердження");
const isOrderConfirmed = ref(false);



const paymentRequest = {
   apiVersion: 2,
   apiVersionMinor: 0,
   allowedPaymentMethods: [
      {
         type: "CARD",
         parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"],
         },
         tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
               gateway: "example",
               gatewayMerchantId: "exampleGatewayMerchantId",
            },
         },
      },
   ],
   merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
   },
   transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US",
   },
};

const onLoadPaymentData = (event) => {
   console.log(event.detail);
};
// fs
const onError = (event) => {
   console.error("error", event.error);
};

const updateTotalPrice = () => {
   const productTotal = calculateTotalSum();
   const shippingCost = getShippingCost(shippingMethod.value);
   totalAmountToPay.value = productTotal + shippingCost;
};

const calculateTotalSum = () => {
   return cartStore.getTotalSum();
};

const getShippingCost = (method) => {
   switch (method) {
      case "Нова пошта":
         return 150;
      case "Укр пошта":
         return 50;
      case "Самовивіз":
         return 100;
      default:
         return 0;
   }
};

const updateShippingMethod = (method) => {
   shippingMethod.value = method;
   updateTotalPrice();
   updateOrderStatus("Очікує підтвердження оплати");
};

const updateOrderStatus = (status) => {
   orderStatus.value = status;
};

const buyButtonClicked = () => {
   const orderId = generateOrderId();
   updateOrderStatus(`Очікує підтвердження, ID замовлення: ${orderId}`);
   isOrderConfirmed.value = true;
};

const generateOrderId = () => {
   return Math.floor(Math.random() * 1000000) + 1;
};
const goToPurchase = () => {
   router.push("/catalog");
};

</script>


<style lang="scss" scoped>
.border-custom {
   border: 2px solid rgba(128, 128, 128, 0.3);
}

.v-btn-toggle {
   justify-content: space-between;
}

.v-btn {
   text-align: center;
   width: 200px;
}

.v-btn-toggle {
   width: 200px;
}

.stat-1 {
   margin-top: -10px;
   font-weight: bold;
}

.order-confirmation {
   margin-top: 40px;
   font-weight: bold;
}

.google-pay-logo {
   max-width: 100%;
}

.apple-pay-logo {
   max-width: 100%;
}

.google-pay-button-container {
   justify-content: center;
   align-items: center;
   height: 100%;
}

.google-pay-button {
   width: 305px;
   height: 40px;
   border: 1px solid #4CAF50;
   border-radius: 4px;
   color: white;
   font-size: 16px;
   cursor: pointer;
   transition: background-color 0.3s;
}

.google-pay-button:hover {
   background-color: #45a049;
}
.exit{
   width: 330px;
   text-align: center;
   color: chocolate;
   margin-top: 10px;

}
</style>
