
import axios from 'axios';
import useUserStore from '../store/userStore';


const base_URL = `https://kabo.designparklab.com.ng/`;


export const instance = axios.create({
    baseURL:base_URL
});


export function login(email, passcode) {
    const postData = {
        email,
        passcode,
    };
    
    return instance.post('account/login',postData)
}

export function registerpost(data) {
    return instance.post('account/register',data)
}

export function logout(data) {
    return instance.post('account/logout',data)
}

export function details (token) {
    const postData = {
        token : token
    }
    
    return instance.post('account/details',postData);
}

export function storedetails (data) {

    return instance.post('store/details',data);
}

export function metrics (token) {
    const postData = {
        token : token
    }
    
    return instance.post('store/metrics',postData);
}

export function getTeams(data){

    const postData = {
        token: data.token,
        email: data.email,
        role: data.role,
    }

    return instance.post( '/store/teams', postData);
}

export function getBanks(data){

    return instance.post('wallet/banks', data);
}

export function active(data){

    return instance.post( 'store/update-team', data);
}

export function getCustomers(data){

    const postData = {
        token: data.token,
        active: "Yes", //enum: Yes, No
        email: data.email
    }

    return instance.post('panel/customers', postData);
}

export function createTeam(data){

    const postData = {
        token: data.token,
        store_id:data.store_id,
        email: data.email,
        role: data.role
    }

    return instance.post('store/add-teams', postData);
}

export function editTeam(data){
    return instance.post('store/update-team', data);
}

export function getStores(data){

    const postData = {
        token: data.token,
        store_id: data.store_id,
        location: data.location,
        store: data.store,
        page: data.page,
        limit: data.limit
    }

    return instance.post('store/list', postData);
}

export function getOrders(data){

    const postData = {
        token: data.token,
        reference_code: data.reference_code,
        account: data.account, //enum: customer or rider or store
        from:data.from,
        to: data.to,
        payment_status: data.payment_status, //enum: Successful or Pending or Failed
        order_status: data.order_status //enum: Successful or Pending or Failed
    }

    return instance.post('order/details', postData);
}

export function singleOrder(data){

    const postData = {
        token: data.token,
        reference_code: data.reference_code,
        account: data.account, 
        from:data.from,
        to: data.to,
        payment_status: data.payment_status, 
        order_status: data.order_status 
    }

    return instance.post('order/details', postData);
}

// account update
export function updateprofile(data){
    return instance.post('account/update-profile', data);

}

export function updateValidId(data){
    return instance.post('account/upload-valid-license', data);

}

export function updateBank(data){
    return instance.post('account/update-bank-details', data);

}

export function updateNextOfKin(data){
    return instance.post('account/update-nok', data);
}

export function updateNextOfKinId(data){
    return instance.post('account/upload-nok-valid-license', data);
}

export function assign(data){

    const postData = {
        token: data.token,
        email: data.email, 
        store_id: data.store_id,
        reference_code: data.reference_code,
    }

    return instance.post('order/attach-rider', postData);
}

export function createOrder(data){

    return instance.post('order/create', data);
}

export function createStore(data){

    const postData = {
        token: data.token,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address
    }

    return instance.post('store/create', postData);
}

export function Storeregister(data){
    return instance.post('store/create', data);
}

export function editStore(data){

    const postData = {
        token: data.token,
        store_id:data.store_id,
        name: data.name,
        address: data.address,
        description: data.description,
        logo: data.photo
    }

    return instance.post('store/update-account', postData);
}

export function getProducts(data){
    const postData = {
        token: data.token,
        id: data.id,
        store_id: data.store_id,
        category_id: data.category_id,
        sub_category_id: data.sub_category_id,
        location: data.location,
        store: data.store,
        orderBy: data.orderBy,
        active: data.active
    };

    return instance.post('store/products',postData);
}

export function createProducts(data){
    const postData = {
        token: data.token,
        store_id: data.store_id,
        name: data.name,
        quantity: data.quantity,
        amount: data.amount,
        details: data.details,
        weight: data.weight,
        category_id: data.category_id,
        sub_category_id: data.sub_category_id,
        main_photo: data.main_photo,
        photo_a: data.photo_a,
        photo_b: data.photo_b,
        photo_c: data.photo_c,
        photo_d: data.photo_d,
        photo_e: data.photo_e,
        active: data.active
    };

    return instance.post('store/add-product',postData);
}

export function editProducts(data){
    const postData = {
        token: data.token,
        store_id: data.store_id,
        id: data.id,
        name: data.name,
        quantity: data.quantity,
        amount: data.amount,
        details: data.details,
        weight: data.weight,
        category_id: data.category_id,
        sub_category_id: data.sub_category_id,
        main_photo: data.main_photo,
        photo_a: data.photo_a,
        photo_b: data.photo_b,
        photo_c: data.photo_c,
        photo_d: data.photo_d,
        photo_e: data.photo_e,
        active: data.active
    };

    return instance.post('store/update-product',postData);
}

export function profileUpdate(data){
    
    return instance.post('account/update-profile',data)
}

export function uploadPic(data){
    
    return instance.post('account/upload-photo',data)
}

export function updatePwd(data){
    
    return instance.post('account/change-password',data)
}

export function getCategories(data){

    const postData ={
        token: data.token,
        category_id: data.category_id
    }

    return instance.post('store/category',postData)
}

export function getSubCategories(data){

    return instance.post('store/sub-category',data)
}

export function location(data){

    return instance.post('rider/get-location',data)
}

export function recover(data){

    return instance.post('account/recover-account',data)
}


export function upload(data){

    return instance.post("misc/file-upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}

export function uploadCSV(data){

    return instance.post("misc/file-upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}

export function getLog(data){

    return instance.post("/logistics/list", data);
}

export function addLog(data){

    return instance.post("/logistics/add", data);
}

export function updateLog(data){

    return instance.post("/logistics/update", data);
}


export function ativityLog(data){

    return instance.post("/panel/log", data);
}
