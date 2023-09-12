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
    CircularProgress,
    Box
} from '@mui/material/'
import { Formik } from 'formik';
import { useUserStore } from 'src/@core/store/userStore';
import { useStoreSlice } from 'src/@core/store/storeSlice';

import { instance } from 'src/@core/hooks/service';
import { useProductsSlice } from 'src/@core/store/productSlice';
import FileUploader from 'src/@core/components/FileUploader';
import { uploadStore } from 'src/@core/store/uploadSlice';
import { LoadingButton } from '@mui/lab';

const EditProductForm = () => {

    const EditProduct =  useProductsSlice( (state)=> state.EditProduct);
    const categories = useProductsSlice( (state)=> state.categories);
    const subcategories = useProductsSlice( (state)=> state.subcategories);
    const setCategories = useProductsSlice( (state)=> state.setCategories);
    const setSubCategories = useProductsSlice( (state)=> state.setSubCategories);
    const loading = useProductsSlice( (state)=> state.loading);
    const product = useProductsSlice( (state)=> state.product);
    const productID = useProductsSlice( (state)=> state.productID);

    const stores = useStoreSlice( (state)=> state.stores);
    const token  = useUserStore( (state) => state.user);
    const setStore = useStoreSlice( (state)=> state.setStore);

    const file_url = uploadStore(state=> state.file_url)

    const initialValues = {
        store_id: product ? product[0].store_id : "",
        name: product ? product[0].name : "",
        quantity: product ? product[0].quantity : "",
        amount: product ? product[0].amount : "",
        details: product ? product[0].details : "",
        weight: product ? product[0].weight : "",
        category_id: product ? product[0].category_id : "",
        sub_category_id: product ? product[0].sub_category_id : "",
        main_photo: product ? product[0].main_photo : "",
        photo_a: product ? product[0].photo_a : "",
        photo_b: product ? product[0].photo_b : "",
        photo_c: product ? product[0].photo_c : "",
        photo_d: product ? product[0].photo_d : "",
        photo_e: product ? product[0].photo_e : "",
        active: product ? product[0].active : ""
    };

    // const store =  stores.filter(store => store.store_id === product ? product[0].store_id : 0 )
    
    // console.log(store)

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
            store_id : values.store_id,
            id: productID,
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

        EditProduct(data)
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
        <>
        {
            product  ? (
                <>
                    <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
                        {({values, handleSubmit,handleChange}) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={7}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant='h5' sx={{ marginBottom: 2 }}>Edit Product</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        {/* <FormControl fullWidth size='small'>
                                            <InputLabel id="demo-simple-select-label">Store</InputLabel>
                                            <Select
                                                name='store_id'
                                                value={values.store_id}
                                                label="Store"
                                                onChange={handleChange}
                                            >
                                                {
                                                    stores.length == 0 ? (
                                                        <MenuItem disabled>
                                                            <CircularProgress size={24} />
                                                        </MenuItem>
                                                    ): (
                                                        stores?.map(item => (
                                                            <MenuItem key={item.store_id} value={item.store_id}>{item.name}</MenuItem>
                                                        ))
                                                    )
                                                }
                                            </Select>
                                        </FormControl> */}
                                        <Box sx={{
                                            display:"flex",
                                            flexDirection:"column"
                                        }}>
                                        <Typography variant="caption">
                                            Branch
                                        </Typography>
                                        <Typography variant="h6">
                                            {stores?.filter(store => store.store_id === values.store_id)[0]?.name}
                                        </Typography>
                                        </Box>
                                    </Grid>
                
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
                                                autoFocus={Boolean(values.category_id)}

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
                                            Edit
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>                
                </>

            ):(
                <Box sx={{
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <CircularProgress size={54} />
                </Box>
            )
        }        
        </>


    );
}

export default EditProductForm;