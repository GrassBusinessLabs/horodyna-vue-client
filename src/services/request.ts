import {apiService} from '@/services/api'
import type {AddPostBody, CurrentUser, GetPostsResponse, LoginBody, Post} from '@/models'

export const requestService = () => {
   const api = apiService()

   async function login(body: LoginBody): Promise<CurrentUser> {
      return api.post('/auth/login', body)
   }

   async function getPosts(): Promise<GetPostsResponse> {
      return api.get('/auth/posts')
   }

   async function addPost(body: AddPostBody): Promise<Post> {
      // WARNING!!! This request only simulates adding a new post
      return api.post('/auth/posts/add', body)
   }

   async function getCurrentUser(): Promise<CurrentUser> {
      return api.get('users')
   }

   async function logout(): Promise<void> {
      return api.post('/auth/logout')
   }

   return {
      login,
      getPosts,
      getCurrentUser,
      logout,
      addPost
   }
}
