
import { create } from 'zustand';

export const AlertStore = create(
    ( set , get )=>({
        messageStatus:false,
        messageType:null,
        message:'',
        setMessage(value){
            set( state => ({ ...state, message: value }))
        },
        setStatus(value){
            set( state => ({ ...state, messageStatus: value }))
        },
        setType(value){
            set( state => ({ ...state, messageType: value }))
        },
        
    })
)