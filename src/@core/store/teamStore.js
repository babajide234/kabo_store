import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { getTeams,getBanks, createTeam, getCustomers, editTeam, location, updateprofile, updateBank, updateNextOfKin, updateValidId, updateNextOfKinId } from '../hooks/service'

import { useUserStore } from './userStore'
import { AlertStore } from './alertSlice';

// const token = useUserStore((state)=> state.user)

export const useTeamSlice = create(
    ( set , get )=>({
        teams:[],
        team:{},
        customers: [],
        riders: [],
        rider: {},
        userId:null,
        edit:false,
        add:false,
        view:false,
        loading:false,
        loc:false,
        location:null,
        banks:null,
        setTeams(data){
            set( state => ({ ...state, loading: true}))
            getTeams(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, teams: res.data.data}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        setBanks(data){
            set( state => ({ ...state, loading: true}))
            getBanks(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, banks: res.data.data}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        setSingleTeams(data){
            set( state => ({ ...state, loading: true}))
            getTeams(data).then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, team: res.data.data}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        setLoc(value){
            set(state => ({ ...state, loc: value }))
        },
        setEdit(value){
            set(state => ({ ...state, edit: value }))
        },
        setAdd(value){
            set(state => ({ ...state, add: value }))
        },
        setView(value){
            set(state => ({ ...state, view: value }))
        },
        setUserId(value){
            set(state => ({ ...state, userId: value }))
        },
        addTeam(data){
            set( state => ({ ...state, loading: true}))
            createTeam(data).then( (res) => {
                console.log(res)
                
                if(res.data.status == 'success'){
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthTeams(data)
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
        editTeam(data){
            set( state => ({ ...state, loading: true}))
            editTeam(data).then( (res) => {
                console.log(res)
                
                if(res.data.status == 'success'){

                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthTeams(data)

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
        setCustomers(data){
            set( state => ({ ...state, loading: true}))
            getCustomers(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, customers: res.data.data}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        setRider(data){
            console.log(data);
            set( state => ({ ...state, loading: true}))
            getTeams(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, riders: res.data.data}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        setSingleRider(data){
            set( state => ({ ...state, loading: true}))
            getTeams(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, rider: res.data.data}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        getLocation(data){
            location({
                token: useUserStore.getState().user,
                email:data.email
            })
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    set( state => ({ ...state, location: res.data.data}))
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                set( state => ({ ...state, loading: false}))
            })
        },
        updateProfile(data){
            set( state => ({ ...state, loading: true}))
            updateprofile(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthTeams(data)
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
        updateBankAcc(data){
            set( state => ({ ...state, loading: true}))
            updateBank(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthTeams(data)
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
        updateNok(data){
            set( state => ({ ...state, loading: true}))
            updateNextOfKin(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
                    AlertStore.getState().setMessage(res.data.message);
                    AlertStore.getState().setStatus(true);
                    AlertStore.getState().setType('success');
                    get().refecthTeams(data)
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
        uploadId(data){
            set( state => ({ ...state, loading: true}))
            updateValidId(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
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
        uploadNokId(data){
            set( state => ({ ...state, loading: true}))
            updateNextOfKinId(data)
            .then( (res) => {
                console.log(res)
                if(res.data.status == 'success'){
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
        refecthTeams(data){
            get().setTeams({
                token: useUserStore.getState().user,
                role:data.role
            })
            get().setEdit(false);
            get().setAdd(false);
        }
    })
)

// export default useTeamSlice;