export interface CurrentUser {
   token: string
   user: {
      id: number
      email: string
      name: string
   }
}

export interface UserData {
   id: number
   email: string
   name: string
}