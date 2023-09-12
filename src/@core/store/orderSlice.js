import { create } from 'zustand'
import { getOrders,assign,createOrder,singleOrder } from '../hooks/service'

// import useUserStore from './userStore'
import { AlertStore } from './alertSlice';
import { useUserStore } from './userStore';

// const token = useUserStore((state)=> state.user)

export const orderSlice = create(
    ( set , get )=>({
        orders:[],
        order:null,
        loading:false,
        edit:false,
        add:false,
        view:false,
        storeRef:null,
        setOrderRef(value){
            set(state => ({ ...state, storeRef: value }))
        },
        setEdit(value){
            set(state => ({ ...state, edit: value }))
        },
        setView(value){
            set(state => ({ ...state, view: value }))
        },
        setAdd(value){
            set(state => ({ ...state, add: value }))
        },
        setOrder(data){
            set( state => ({ ...state, loading: true}))
            getOrders(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, orders: res.data.data}))
                    set( state => ({ ...state, loading: false}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        setSingleOrder(data){
            set( state => ({ ...state, loading: true}))
            singleOrder(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, order: res.data.data}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        assignRider(data){
            set( state => ({ ...state, loading: true}))
            assign(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthStore();                
                } else {
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
        createOrder(data){
            set( state => ({ ...state, loading: true}))
            createOrder(data)
                .then( (res) => {
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
            const data= {
                token: useUserStore.getState().user,
                reference_code: "",
                account: useUserStore.getState().details.role.superAdmin === 'Yes' ? "panel" : "store", 
                from: "",
                to: "",
                payment_status: "",
                order_status: type 
            }
            get().setOrder(data);
            get().setEdit(false);
            get().setAdd(false);
        }
    })
)

// export default useStoreSlice;