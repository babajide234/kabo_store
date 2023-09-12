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


const AddProductForm = () => {

    const addProduct =  useProductsSlice( (state)=> state.addProduct);
    const categories = useProductsSlice( (state)=> state.categories);
    const subcategories = useProductsSlice( (state)=> state.subcategories);
    const setCategories = useProductsSlice( (state)=> state.setCategories);
    const setSubCategories = useProductsSlice( (state)=> state.setSubCategories);
    const loading = useProductsSlice( (state)=> state.loading);

    const stores = useStoreSlice( (state)=> state.stores);
    const token  = useUserStore( (state) => state.user);
    const details  = useUserStore( (state) => state.details);
    const setStore = useStoreSlice( (state)=> state.setStore);

    const file_url = uploadStore(state=> state.file_url)
    const S_id = details.store_id.admin ? details.store_id.admin : '';
    const storeId = details.role.superAdmin == "Yes" ? details.store_id.superAdmin : details.store_id.admin;



    const initialValues = {
        name: "",
        quantity: "",
        amount: "",
        details: "",
        weight: "",
        category_id: "",
        sub_category_id: "",
        main_photo: "",
        photo_a: "",
        photo_b: "",
        photo_c: "",
        photo_d: "",
        photo_e: "",
        active: ""
    };

    const [mainPhoto, setMainPhoto] = useState(null);


    useEffect(() => {
        setCategories({
            token,
            category_id: ""
        })
        setStore({
            token,
            store_id: "",
            location: "",
            store: "",
            page: "",
            limit: ""
        })
    }, [token,setCategories,setStore])


    const handleSubmit = (values) =>{
     
        const data = {
            token,
            store_id : storeId,
            name : values.name,
            quantity : values.quantity,
            amount : values.amount,
            details : values.details,
            weight : values.weight,
            category_id : values.category_id,
            sub_category_id : values.sub_category_id,
            main_photo : file_url,
            photo_a : values.photo_a,
            photo_b : values.photo_b,
            photo_c : values.photo_c,
            photo_d : values.photo_d,
            photo_e : values.photo_e,
            active : "Yes",
        }

        addProduct(data)
    }

    const handleGetSubCat = (event)=>{
        console.log(event.target.value)
        setSubCategories({
            token,
            sub_category_id:"",
            category_id: event.target.value
        })
    }

    return (
        <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
            {({values, handleSubmit,handleChange}) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={7}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant='h5' sx={{ marginBottom: 2 }}>Add New Product</Typography>
                        </Grid>
                        {

                            // !S_id && 
                            // <Grid item xs={12} sm={12}>
                            //     <FormControl fullWidth size='small'>
                            //         <InputLabel id="demo-simple-select-label">Store</InputLabel>
                            //         <Select
                            //             name='store_id'
                            //             value={values.store_id}
                            //             label="Store"
                            //             onChange={handleChange}
                            //         >
                            //             {
                            //                 stores == null ? (
                            //                     <MenuItem disabled>
                            //                         {/* <CircularProgress size={24} /> */}
                            //                         No Stores Available
                            //                     </MenuItem>
                            //                 ): (
                            //                     stores?.map(item => (
                            //                         <MenuItem key={item.store_id} value={item.store_id}>{item.name}</MenuItem>
                            //                     ))
                            //                 )
                            //             }
                            //         </Select>
                            //     </FormControl>
                            // </Grid>
                        }

                        <Grid item xs={12} sm={12}>
                            <TextField 
                                fullWidth 
                                size='small' 
                                label='Name'  
                                name='name' 
                                placeholder='name'  
                                value={values.name} 
                                onChange={handleChange} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            fullWidth 
                            size='small' 
                            label='Quantity' 
                            type="number"  
                            name='quantity' 
                            placeholder='quantity' 
                             value={values.quantity} 
                             onChange={handleChange} 
                             />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">&#8358;</InputAdornment>}
                                    label="Amount"
                                    name="amount"
                                    value={values.amount}
                                    onChange={handleChange}
                                    size='small'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField multiline minRows={3} size='small' fullWidth label='Details' type="text"  name='details' placeholder='Details'  value={values.details} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth size='small' label='Weight' type="text"  name='weight' placeholder='weight'  value={values.weight} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    name='category_id'
                                    value={values.category_id}
                                    label="Category"
                                    onChange={(event)=>{
                                        handleChange(event);
                                        handleGetSubCat(event);
                                    }}
                                >
                                    {categories.length == 0 ? (
                                        <MenuItem disabled>
                                            <CircularProgress size={24} />
                                        </MenuItem>
                                    ) : (
                                        categories.map((category) => (
                                            <MenuItem key={category.category_id} value={category.category_id}>
                                                {category.category_name}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
                                <Select
                                    name='sub_category_id'
                                    value={values.sub_category_id}
                                    label="Subcategory"
                                    onChange={handleChange}
                                >
                                    {
                                        subcategories?.length == 0 ? (
                                            <MenuItem disabled>
                                                <CircularProgress size={24} />
                                            </MenuItem>
                                        ) : (
                                            subcategories?.map((category) => (
                                                <MenuItem key={category.sub_category_id} value={category.sub_category_id}>
                                                    {category.sub_category_name}
                                                </MenuItem>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ display:"flex", alignItems:"center"}}>
                            <FileUploader/>
                        </Grid>
                        <Grid item xs={12} >
                            <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                                Create New Product
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}

export default AddProductForm;