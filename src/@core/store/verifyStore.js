import { create } from 'zustand'
import { instance } from '../hooks/service'
import { AlertStore } from './alertSlice'

export const VerifyStore = create((set, get) => ({
  verifiedUsers: null,
  add: null,
  check: false,
  verifycheck: false,
  kyc_id: null,
  loading: false,
  getVerifications: async data => {
    try {
      const response = await instance.post('verification/process', data)
      set(state => ({ ...state, verifiedUsers: response.data.data }))

      return response.data
    } catch (error) {
      console.log(error)

      return error
    } finally {
      return null
    }
  },
  getCheck: async data => {
    try {
      set(state => ({ ...state, loading: true }))
      const response = await instance.post('verification/check', data)
      console.log(response)

      if (response.data.status === 'success') {
        set(state => ({ ...state, verifycheck: true }))
        AlertStore.getState().setMessage(response.data.message)
        AlertStore.getState().setStatus(true)
        AlertStore.getState().setType('success')
      } else {
        AlertStore.getState().setMessage(response.data.message)
        AlertStore.getState().setStatus(true)
        AlertStore.getState().setType('error')
      }

      console.log(response.data.data)

      return response.data
    } catch (error) {
      console.log(error)

      return error
    } finally {
      set(state => ({ ...state, loading: false }))

      return null
    }
  },
  getTrack: async data => {
    try {
      set(state => ({ ...state, loading: true }))
      const response = await instance.post('verification/track', data)
      set(state => ({ ...state, verifycheck: response.data.data }))

      return response.data
    } catch (error) {
      console.log(error)

      return error
    } finally {
      set(state => ({ ...state, loading: false }))

      return null
    }
  },
  resenOtp: async data => {
    try {
      const response = await instance.post('verification/check', data)

      return response.data
    } catch (error) {
      console.log(error)

      return error
    } finally {
      return null
    }
  },
  setAdd: value => {
    set(state => ({ ...state, add: value }))
  },
  setCheck: value => {
    set(state => ({ ...state, check: value }))
  },
  setKycId: value => {
    set(state => ({ ...state, kyc_id: value }))
  }
}))
