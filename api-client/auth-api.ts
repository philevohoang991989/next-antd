// import { LoginPayload } from '@/models'
import axiosClient from './axios-client'

export const authApi = {
  login(payload: any) {
    return axiosClient.post('/auth/login', payload)
  },
  logout() {
    return axiosClient.post('/logout')
  },
  getProfile() {
    return axiosClient.get('/profile')
  }
}