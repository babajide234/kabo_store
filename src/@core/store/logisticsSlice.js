import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { getLog,updateLog,addLog } from '../hooks/service'

import { useUserStore } from './userStore'
import { AlertStore } from './alertSlice';

// const token = useUserStore((state)=> state.user)

export const logisticsSlice = create(
    ( set , get )=>({
        logs:[],
        log:null,
        logId:null,
        edit:false,
        add:false,
        loading: false,
        list(data){
            getLog(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, logs: res.data.data}))
                }
            })
        },
        singleList(data){
            getLog(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, log: res.data.data}))
                }
            })
        },
        setDisId(value){
            set(state => ({ ...state, logId: value }))
        },
        setEdit(value){
            set(state => ({ ...state, edit: value }))
        },
        setAdd(value){
            set(state => ({ ...state, add: value }))
        },
        addLog(data){
            set( state => ({ ...state, loading: true}))
            addLog(data).then( (res) => {
                console.log(res)

                if(res.data.status == 'success'){
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthLog()
                }else{
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('error');
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        editLog(data){
            set( state => ({ ...state, loading: true}))
            updateLog(data).then( (res) => {
                console.log(res)

                if(res.data.status == 'success'){
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthProducts()
                }else{
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('error');
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        refecthLog(){
            get().list({
                token: useUserStore.getState().user
            })
            get().setEdit(false);
            get().setAdd(false);
        }
    })
)

