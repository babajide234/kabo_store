import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { AlertStore } from './alertSlice'

import {
  login,
  logout,
  details,
  storedetails,
  metrics,
  profileUpdate,
  recover,
  uploadPic,
  updatePwd,
  registerpost,
  instance
} from '../hooks/service'

export const useUserStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      loading: false,
      passwordReset: false,
      user: '',
      role: '',
      details: {},
      message: null,
      metrics: null,
      registerStatus: false,
      registerToken: null,
      verifydetails: null,
      track: null,
      setMessage(value) {
        set(state => ({ ...state, message: value }))
      },
      setIsAuth(value) {
        set(state => ({ ...state, isAuthenticated: value }))
      },
      login(email, passcode) {
        set(state => ({ ...state, loading: true }))
        login(email, passcode)
          .then(res => {
            console.log(res)
            if (res.data.status == 'success') {
              set(state => ({ ...state, isAuthenticated: true }))
              set(state => ({ ...state, user: res.data.token }))
              set(state => ({ ...state, details: res.data.data }))

              AlertStore.getState().setMessage(res.data.message)
              AlertStore.getState().setStatus(true)
              AlertStore.getState().setType('success')
            } else {
              AlertStore.getState().setMessage(res.data.message)
              AlertStore.getState().setStatus(true)
              AlertStore.getState().setType('error')
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            set(state => ({ ...state, loading: false }))
          })
      },
      register(data) {
        set(state => ({ ...state, loading: true }))
        registerpost(data)
          .then(res => {
            console.log(res)
            if (res.data.status == 'success') {
              set(state => ({ ...state, registerStatus: true }))
              set(state => ({ ...state, registerToken: res.data.token }))

              AlertStore.getState().setMessage(res.data.message)
              AlertStore.getState().setStatus(true)
              AlertStore.getState().setType('success')
            } else {
              AlertStore.getState().setMessage(res.data.message)
              AlertStore.getState().setStatus(true)
              AlertStore.getState().setType('error')
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            set(state => ({ ...state, loading: false }))
          })
      },
      logout() {
        logout({ token: get().user })
          .then(res => {
            if (res.data.status == 'success') {
              set(state => ({ ...state, isAuthenticated: false }))
              set(state => ({ ...state, user: '' }))
              set(state => ({ ...state, details: {} }))
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            set(state => ({ ...state, loading: false }))
          })
      },
      setDetials() {
        details(get().user).then(res => {
          console.log(res)
          if (res.data.status == 'success') {
            set(state => ({ ...state, details: res.data.data }))
          }
        })
      },
      getVerifiables(data) {
        storedetails(data).then(res => {
          console.log(res)
          if (res.data.status == 'success') {
            set(state => ({ ...state, verifydetails: res.data.data }))
          }
        })
      },
      trackverification: async data => {
        try {
          const response = await instance.post('verification/track', data)
          console.log(response.data.data)
          set(state => ({ ...state, track: response.data.data }))

          return response.data.data
        } catch (err) {
          console.log(err)
        }
      },
      getMetrics() {
        metrics(get().user).then(res => {
          console.log(res)
          if (res.data.status == 'success') {
            set(state => ({ ...state, metrics: res.data.data }))
          }
        })
      },
      updateProfile(data) {
        set(state => ({ ...state, loading: true }))
        profileUpdate(data)
          .then(res => {
            console.log(res)
            if (res.data.status == 'success') {
              AlertStore.getState().setMessage(res.data.message)
              AlertStore.getState().setStatus(true)
              AlertStore.getState().setType('success')
              get().setDetials()
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            set(state => ({ ...state, loading: false }))
          })
      },
      uploadPic(data) {
        set(state => ({ ...state, loading: true }))
        uploadPic(data)
          .then(res => {
            console.log(res)
            if (res.data.status == 'success') {
              AlertStore.getState().setMessage(res.data.message)
              AlertStore.getState().setStatus(true)
              AlertStore.getState().setType('success')
              get().setDetials()
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            set(state => ({ ...state, loading: false }))
          })
      },
      updatePwd(data) {
        set(state => ({ ...state, loading: true }))
        updatePwd(data)
          .then(res => {
            console.log(res)
            if (res.data.status == 'success') {
              AlertStore.getState().setMessage(res.data.message)
              AlertStore.getState().setStatus(true)
              AlertStore.getState().setType('success')
              get().setDetials()
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            set(state => ({ ...state, loading: false }))
          })
      },
      recoverAccount(data) {
        set(state => ({ ...state, loading: true }))

        recover(data)
          .then(res => {
            console.log(res)
            if (res.data.status == 'success') {
              set(state => ({ ...state, passwordReset: true }))
              AlertStore.getState().setMessage(res.data.message)
              AlertStore.getState().setStatus(true)
              AlertStore.getState().setType('success')
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            set(state => ({ ...state, loading: false }))
          })
      }
    }),
    {
      name: 'user-storage', // unique name
      storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
)

// export default useUserStore
