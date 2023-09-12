import {create} from 'zustand'
import { instance } from '../hooks/service'
import { useUserStore } from './userStore';
import { AlertStore } from './alertSlice';

export const walletStore = create(
    (set,get) =>({
        transactions:null,
        details:null,
        add:false,
        generate:false,
        laoding:false,
        getTransactions: async(data) => {
            try {
                const response = await instance.post('wallet/transactions',data);
                console.log(response.data.data)
                set(state => ({...state, transactions:response.data}))
                
                return response.data;
            } catch (error) {
                console.log(error);
                
                return error;
            } finally{
                return null;
            }
        },
        getDetails: (payload) => {
            try {
                const response = instance.post('wallet/details',payload);
                response.then((res)=>{
                    set( state => ({ ...state, details: res.data.data[0]}))
                })

                return response.data;

                // return response.data;response
            } catch (error) {
                return error;
            } finally {
                return null;
            }
        },
        generateAccount: async(data) => {
            try {

                set(state => ({...state, loading:true}));
                const response = await instance.post('wallet/generate-virtual-account',data);
                
                if(response.data.status == 'success'){
                    AlertStore.getState().setMessage(response.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refetch();

                }else{
                    AlertStore.getState().setMessage(response.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('error');
                }

                return response.data;
            } catch (error) {
                return error;
            } finally {
                set(state => ({...state, loading:false}));
                set(state => ({...state, generate:false}));

                return null;
            }
        },
        withdraw: async(data) => {
            try {
                set(state => ({...state, loading:true}));
                const response = await instance.post('wallet/transfer',data);
                
                if(response.data.status == 'success'){
                    AlertStore.getState().setMessage(response.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refetch();
                } else {
                    AlertStore.getState().setMessage(response.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('error');
                }

                return response.data;
            } catch (error) {
                return error;
            } finally {
                set(state => ({...state, loading:false}));
                set(state => ({...state, generate:false}));
                get().refetch();

                return null;
            }
        },
        setAdd: (value) =>{
            set(state => ({...state, add:value}))
        },
        setGenerate: (value) =>{
            set(state => ({...state, generate:value}))
        },
        refetch: (value) =>{
            get().getDetails({
                token: useUserStore.getState().user,
                wallet_id: "",
                account: "panel", 
                store_id: "",
                orderBy: "", 
                active: "" 
            })
        },
    })
)