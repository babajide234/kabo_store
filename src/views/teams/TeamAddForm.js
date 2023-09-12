import { useState,useEffect } from 'react';
import { 
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Button
} from '@mui/material/'
import {useTeamSlice} from 'src/@core/store/teamStore';
import {useUserStore} from 'src/@core/store/userStore';
import { useStoreSlice } from 'src/@core/store/storeSlice';
import { LoadingButton } from '@mui/lab';

const TeamAddForm = ({from}) => {
    
    const addTeam = useTeamSlice( (state)=> state.addTeam);
    const token  = useUserStore( (state) => state.user)
    const details  = useUserStore( (state) => state.details)

    const setStore = useStoreSlice((state)=> state.setStore )
    const stores = useStoreSlice(state => state.stores);
    const loading = useStoreSlice(state => state.loading);

    // const role = details ? details.role : undefined;
    // console.log(role)


    const S_id = details.store_id.admin ? details.store_id.admin : '';

    const storeId = details.role.superAdmin == "Yes" ? details.store_id.superAdmin : details.store_id.admin;

    const [ email, setEmail ] = useState('');
    const [ role, setRole ] = useState(from);

    const [ store_id, setStoreId ] = useState(S_id);


    console.log(storeId)


    const handleChange = (value)=>{
        setForm({ ...form, value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    
        const data = {
            token,
            store_id:storeId,
            email,
            role,
        }

        addTeam(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={7}>
                <Grid item xs={12} sm={12}>
                    <Typography variant='h5' sx={{ marginBottom: 2 }}> { from == "rider" ? "Add Rider" : "Add Team Member"}</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth label='Email' placeholder='email'  value={email} onChange={(e)=> setEmail(e.target.value)} />
                </Grid>
                
                <Grid item xs={12} >
                    <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                       Save
                    </LoadingButton>
                </Grid>
             </Grid>
        </form>
    );
}

export default TeamAddForm;