import React , { useState } from 'react'
import { Formik } from "formik";
import { 
    Grid, 
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CardContent
} from "@mui/material";

import { 
    LoadingButton
} from "@mui/lab";
import { useStoreSlice } from 'src/@core/store/storeSlice';
import { useUserStore } from 'src/@core/store/userStore';
import FileUploader from 'src/@core/components/FileUploader';
import { uploadStore } from 'src/@core/store/uploadSlice';


const EditStoreForm = () => {
    const token = useUserStore(state => state.user)
    const stores = useStoreSlice(state => state.stores);
    const storeId = useStoreSlice(state => state.storeId);
    const setActive = useStoreSlice(state => state.setActive);
    const loading = useStoreSlice(state => state.loading);

    const file_url = uploadStore(state=> state.file_url)
    
    const storeData= stores?.filter((item) =>  item.store_id == storeId)[0];

    // const initialValues = {
    //     store_id: storeId,
    //     name: storeData.name,
    //     address: storeData.address,
    //     description: storeData.description,
    //     photo: file_url
    // };

    // const handleSubmit =(values)=>{
    //     const data = {
    //         token:token,
    //         store_id: storeId,
    //         name: values.name,
    //         address: values.address,
    //         description: values.description,
    //         photo: file_url
    //     };

    //     editStore(data);
    // }
    const handleSubmit = (values) =>{
        
        const data = {
            token,
            store_id: storeId,
            active: values.active, 
            email: ""
        }

        setActive(data)
    }

    return (
        <Formik initialValues={{ active: "" }} enableReinitialize={true} onSubmit={handleSubmit}>
        {({values, handleSubmit,handleChange}) => (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={12}>
                    <Grid item xs={12}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                name='active'
                                label="Status"
                                value={values.active}
                                onChange={handleChange}
                            >
                                
                                <MenuItem  value='Yes'>Yes</MenuItem>
                                <MenuItem  value='No'>No</MenuItem>
                            
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                            Update
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        )}
        </Formik>

    );
}

export default EditStoreForm;