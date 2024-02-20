<template>
   <ion-list
      lines='none'
   >
      <ion-item>
         <ion-select
            :value='currentLang'
            :cancel-text='translate("BTNS.CANCEL")'
            :ok-text='translate("BTNS.OK")'
            @ionChange='selectHandler'
         >
            <ion-select-option
               v-for='lang in langs'
               :key='lang.lang'
               :value='lang.lang'
            >
               {{ translate(lang.localizeKey) }}
            </ion-select-option>
         </ion-select>
      </ion-item>
   </ion-list>
</template>

<script lang='ts' setup>
import {ref} from 'vue'
import type {SelectCustomEvent} from '@ionic/vue'
import {IonItem, IonList, IonSelect, IonSelectOption} from '@ionic/vue'

import type {Lang, LangInfo} from '@/i18n'
import {useAppI18n} from '@/i18n'

const {locale, getLangsInfo, changeLang, translate} = useAppI18n()

const langs = ref<LangInfo[]>(getLangsInfo())
const currentLang = ref<Lang>(locale.value as Lang)

function selectHandler(event: SelectCustomEvent<Lang>): void {
   changeLang(event.detail.value)
   currentLang.value = event.detail.value
}
</script>

<style lang='scss' scoped>
ion-list {
   padding: 0;
   background: transparent;
}

ion-item {
   --background: transparent;
   --color: light;
}

ion-item::part(native) {
   padding: 0;
}

ion-select {
   --background: transparent;
}

ion-select::part(icon) {
   color: var(--ion-color-light);
}
</style>
