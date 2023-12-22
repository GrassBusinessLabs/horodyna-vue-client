import {defineStore} from 'pinia'

interface State {
   basket: any
}

export const productStore = defineStore("productStore", {
   state: (): State => ({
      basket: []
   })
})