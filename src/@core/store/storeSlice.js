import { create } from 'zustand'
import { getStores, createStore, editStore,active,Storeregister } from '../hooks/service'

// import useUserStore from './userStore'
import { AlertStore } from './alertSlice';
import { useUserStore } from './userStore';

// const token = useUserStore((state)=> state.user)

export const useStoreSlice = create(
    ( set , get )=>({
        stores:null,
        edit:false,
        add:false, 
        loading:false,
        storeId:null,
        setStore(data){
            set( state => ({ ...state, loading: true}))
            getStores(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, stores: res.data.data}))
                    set( state => ({ ...state, loading: false}))
                }
            })
        },
        setStoreId(value){
            set(state => ({ ...state, storeId: value }))
        },
        setEdit(value){
            set(state => ({ ...state, edit: value }))
        },
        setAdd(value){
            set(state => ({ ...state, add: value }))
        },
        addStore(data){
            set( state => ({ ...state, loading: true}))
            createStore(data)
                .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthStore();
                }else {
                    set( state => ({ ...state, add: false}))
                    
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
                set( state => ({ ...state, add: false}))

            })
        },
        registerStore(data){
            set( state => ({ ...state, loading: true}))
            Storeregister(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    get().setStoreId(res.data.store_id)
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                }else {
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('error');
                }
                
                return res;
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        editStore(data){
            set( state => ({ ...state, loading: true}))
            editStore(data).then( (res) => {
                console.log(res)
                
                if(res.data.status == 'success'){
                    
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthStore();
                }else {
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
        setActive(data){
            set( state => ({ ...state, loading: true}))
            active(data).then( (res) => {
                console.log(res)
                
                if(res.data.status == 'success'){
                    
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthStore();
                }else {
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
        refecthStore(){
            const data={
                token: useUserStore.getState().user
            }
            get().setStore(data);
            get().setEdit(false);
            get().setAdd(false);
        }
    })
)

// export default useStoreSlice;