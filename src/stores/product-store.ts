import {defineStore} from 'pinia'
interface State {
   basket: any,
   total:number,
}
export const productStore=defineStore("productStore",{
   state:():State =>({
      basket:[],
      total:0,
//commit
   }),


})