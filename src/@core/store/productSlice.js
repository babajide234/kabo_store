import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { getProducts, getCategories,getSubCategories, createProducts,editProducts, uploadCSV } from '../hooks/service'

import { useUserStore } from './userStore'
import { AlertStore } from './alertSlice';

// const token = useUserStore((state)=> state.user)

export const useProductsSlice = create(
    ( set , get )=>({
        products:[],
        product:null,
        productID:null,
        edit:false,
        add:false,
        categories: [],
        subcategories: [],
        loading:false,
        setProducts(data){
            getProducts(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, products: res.data.data}))
                }
            })
        },
        setSingleProducts(data){
            getProducts(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, product: res.data.data}))
                }
            })
        },
        clearProduct(){
            set( state => ({ ...state, product:null}))
        },
        setCategories(data){
            getCategories(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, categories: res.data.data}))
                }
            })
        },
        setSubCategories(data){
            getSubCategories(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, subcategories: res.data.data}))
                }
            })

        },
        setProductId(value){
            set(state => ({ ...state, productID: value }))
        },
        setEdit(value){
            set(state => ({ ...state, edit: value }))
        },
        setAdd(value){
            set(state => ({ ...state, add: value }))
        },
        addProduct(data){
            set( state => ({ ...state, loading: true}))
            createProducts(data).then( (res) => {
                console.log(res)
                set(state => ({ ...state, add: false }))

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
        EditProduct(data){
            set( state => ({ ...state, loading: true}))
            editProducts(data).then( (res) => {
                console.log(res)
                set(state => ({ ...state, add: false }))

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
        uploadProductCsv(data){
            set( state => ({ ...state, loading: true}))

            uploadCSV(data).then((res)=>{
                if(res.data.status == "success"){
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
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
        refecthProducts(){
            get().setProducts({
                token: useUserStore.getState().user
            })
            get().setEdit(false);
            get().setAdd(false);
        }
    })
)

// export default useProductsSlice;