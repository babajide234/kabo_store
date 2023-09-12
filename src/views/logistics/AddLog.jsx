import { useState, useEffect } from 'react';
import { 
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Button,
    OutlinedInput,
    InputAdornment,
    Input,
    Chip,
    CircularProgress
} from '@mui/material/'
import { Formik } from 'formik';

import { useUserStore } from 'src/@core/store/userStore';
import { useStoreSlice } from 'src/@core/store/storeSlice';

import { instance } from 'src/@core/hooks/service';
import { useProductsSlice } from 'src/@core/store/productSlice';
import FileUploader from 'src/@core/components/FileUploader';
import { uploadStore } from 'src/@core/store/uploadSlice';
import { LoadingButton } from '@mui/lab';
import { logisticsSlice } from 'src/@core/store/logisticsSlice';


const AddLog = () => {

    const addLog =  logisticsSlice( (state)=> state.addLog);
    const loading = logisticsSlice( (state)=> state.loading);
    const token  = useUserStore( (state) => state.user);


    const initialValues = {
        distance: "",
        amount: "",
    };


    const handleSubmit = (values) =>{
     
        const data = {
            token,
            distance: values.distance,
            amount: values.amount,
        }

        addLog(data)
    }

    return (

        <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
            {({values, handleSubmit,handleChange}) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={7}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='h5' sx={{ marginBottom: 2 }}>Add New Distance</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField 
                                fullWidth 
                                size='small' 
                                label='Distance'  
                                name='distance' 
                                placeholder='Distance'  
                                value={values.distance} 
                                onChange={handleChange} 
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField 
                                fullWidth 
                                size='small' 
                                label='Amount'  
                                name='amount' 
                                placeholder='Amount'  
                                value={values.amount} 
                                onChange={handleChange} 
                            />
                        </Grid>
                        
                        <Grid item xs={12} >
                            <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                                Create Distance
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}

export default AddLog;