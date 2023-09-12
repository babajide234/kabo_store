import { useState, useEffect } from 'react';
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
import { Formik } from 'formik';
import { useStoreSlice } from 'src/@core/store/storeSlice';
import { useTeamSlice } from 'src/@core/store/teamStore';
import { useUserStore } from 'src/@core/store/userStore';
import { orderSlice } from 'src/@core/store/orderSlice';
import { LoadingButton } from '@mui/lab';


const AssignRider = () => {
    
    const token = useUserStore(state => state.user)
    const details = useUserStore(state => state.details)
    const stores = useStoreSlice(state => state.stores);
    const setStore = useStoreSlice(state => state.setStore);
    const setTeams = useTeamSlice(state => state.setTeams);
    const teams = useTeamSlice(state => state.teams);
    const storeRef = orderSlice(state => state.storeRef);
    const assignRider = orderSlice(state => state.assignRider);
    const loading = orderSlice(state => state.loading);
    const S_id = details.store_id.admin ? details.store_id.admin : '';

    useEffect(() => {
    
        const data = {
            token: token,
            email: "",
            role:"rider",
            type: details.role.admin == "Yes" ? "Admin" : "SuperAdmin" 
        }
        
        setTeams(data);

    }, [token, setTeams, details.role.admin])

    useEffect(() => {
    
        const data = {
            token: token,
            store_id: "",
            location: "",
            store: "",
            page: "",
            limit: ""
        }
        
        setStore(data);

    }, [token,setStore])

    const initialValues = {
        email: "",
        store_id: S_id ? S_id : "",
        reference_code:""
    };

    const handleSubmit = (values) =>{

        const data = {
            token,
            email: values.email,
            store_id:values.store_id,
            reference_code: [storeRef]
        }

        assignRider(data)
    }



    return (
        <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
        {({values, handleSubmit,handleChange}) => (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={7}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' sx={{ marginBottom: 2 }}>Assign Rider to Order</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel>Rider</InputLabel>
                            <Select label='Email' name='email' value={values.email} onChange={handleChange}  >
                                {
                                    teams?.map((item)=>(
                                        <MenuItem key={item.email} value={item.email}>{item.email}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        !S_id &&
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel>Store</InputLabel>
                                <Select label='Store' name='store_id' value={values.store_id} onChange={handleChange}  >
                                    {
                                        stores?.map((item)=>(
                                            <MenuItem key={item.store_id} value={item.store_id}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    }
                    <Grid item xs={12} >
                        <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>Assign Rider</LoadingButton>
                    </Grid>
                </Grid>
            </form>
        )}
    </Formik>
    );
}

export default AssignRider;