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


const EditLog = () => {

    const editLog =  logisticsSlice( (state)=> state.editLog);
    const loading = logisticsSlice( (state)=> state.loading);
    const log = logisticsSlice( (state)=> state.log);
    const logId = logisticsSlice( (state)=> state.logId);
    const token  = useUserStore( (state) => state.user);


    const initialValues = {
        distance: log ? log[0].distance :  "",
        amount:  log ? log[0].amount : "",
    };


    const handleSubmit = (values) =>{
     
        const data = {
            token,
            distance: values.distance,
            amount: values.amount,
            id: logId,
        }

        editLog(data)
    }

    return (

        <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
            {({values, handleSubmit,handleChange}) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={7}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='h5' sx={{ marginBottom: 2 }}>Edit Distance</Typography>
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
                               Edit
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}

export default EditLog;