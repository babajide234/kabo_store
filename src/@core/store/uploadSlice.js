import {create} from 'zustand'

export const uploadStore = create(
    (set,get) =>({
        file_url:"",
        setFileUrl(value){
            set( state => ({ ...state, file_url: value}))
        }
    })
)