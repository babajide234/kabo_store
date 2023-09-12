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

import {useUserStore} from 'src/@core/store/userStore';
import {useStoreSlice} from 'src/@core/store/storeSlice';
import { Formik } from 'formik';

const AddStoresForm = () => {

    const addStore = useStoreSlice( (state)=> state.addStore);
    const token  = useUserStore( (state) => state.user)
    
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        address: ""
    };

    const handleSubmit = (values) =>{

        const data = {
            token,
            name:values.name,
            phone:values.phone,
            email:values.email,
            address:values.address,
        }
        addStore(data)
    }

    return (
        <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
            {({values, handleSubmit,handleChange}) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={7}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='h5' sx={{ marginBottom: 2 }}>Add New Store</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label='Name' name="name" placeholder='name'  value={values.name} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label='Contact Details' name="phone" placeholder='Contact Details'  value={values.phone} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth label='Email' placeholder='email' name="email"  value={values.email} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                           <TextField multiline minRows={3} name="address" value={values.address} defaultValue={values.address}  fullWidth label='Address' onChange={handleChange} placeholder='Address'  />
                       </Grid>
                        <Grid item xs={12} >
                            <Button variant='contained' type='submit' sx={{ float:"right"}}>Create</Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}

export default AddStoresForm;