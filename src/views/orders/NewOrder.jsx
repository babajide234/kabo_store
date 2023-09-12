import React, { useEffect} from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
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
import { styled } from '@mui/material/styles';

import LoadingButton from '@mui/lab/LoadingButton';

import * as Yup from 'yup';
import { useProductsSlice } from 'src/@core/store/productSlice';
import { useStoreSlice } from 'src/@core/store/storeSlice';
import { useTeamSlice } from 'src/@core/store/teamStore';
import { useUserStore } from 'src/@core/store/userStore';
import { orderSlice } from 'src/@core/store/orderSlice';

const NewOrder = () => {
    const products = useProductsSlice(state => state.products)
    const token = useUserStore(state => state.user)
    const stores = useStoreSlice(state => state.stores);
    const setStore = useStoreSlice(state => state.setStore);
    const setTeams = useTeamSlice(state => state.setTeams);
    const teams = useTeamSlice(state => state.teams);
    const storeRef = orderSlice(state => state.storeRef);
    const createOrder = orderSlice(state => state.createOrder);
    const loading = orderSlice(state => state.loading);
    const setProducts = useProductsSlice((state)=> state.setProducts )


    useEffect(() => {
        const data ={
            token: token,
            id: "",
            store_id: "",
            category_id: "",
            sub_category_id: "",
            location: "",
            store: "",
            orderBy: "",
            active: "Yes"
        }
        setProducts(data);
    }, [token,setProducts])

    const initialValues = {
        email: '',
        phone: '',
        product: [
          {
            id: '',
            quantity: '',
          },
        ],
        shipping: {
          details: '',
          info: '',
        },
      };


    const handleSubmit = (values) =>{

        const data = {
            token,
            email:values.email,
            phone:values.phone,
            product:values.product,
            shipping:values.shipping
        }

        createOrder(data)
    }

    // const validationSchema = Yup.object().shape({
    //     token: Yup.string().required('Token is required'),
    //     email: Yup.string().email('Invalid email').required('Email is required'),
    //     phone: Yup.string().required('Phone is required'),
    //     product: Yup.array().of(
    //       Yup.object().shape({
    //         id: Yup.string().required('Product ID is required'),
    //         quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
    //       })
    //     ),
    //     shipping: Yup.object().shape({
    //       details: Yup.string().required('Shipping details are required'),
    //       info: Yup.string().required('Shipping info is required'),
    //     }),
    // });

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} >
            {({ values, errors, touched,isSubmitting, handleChange }) => (
            <Form>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' sx={{ marginBottom: 2 }}>Create New Order</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        id="phone"
                        name="phone"
                        label="Phone"
                        variant="outlined"
                        value={values.phone}
                        onChange={handleChange}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                    />
                    </Grid>
                
                    <FieldArray name="product">
                        {({ insert, remove, push }) => (
                            <Grid item xs={12}>
                                {values.product.length > 0 &&
                                values.product.map((product, index) => (
                                <Grid container mb={4} spacing={2} key={index}>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Products</InputLabel>
                                            <Select 
                                                fullWidth
                                                id={`product.${index}.id`}
                                                name={`product.${index}.id`}
                                                label="Product ID"
                                                variant="outlined"
                                                value={values.product[index].id}
                                                onChange={handleChange}
                                            >
                                                {
                                                    products?.map((item)=>(
                                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            id={`product.${index}.quantity`}
                                            name={`product.${index}.quantity`}
                                            label="Quantity"
                                            variant="outlined"
                                            value={values.product[index].quantity}
                                            onChange={handleChange}
                                            error={touched.product && touched.product[index] && Boolean(errors.product?.[index]?.quantity)}
                                            helperText={touched.product && touched.product[index] && errors.product?.[index]?.quantity}
                                        />

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button variant="contained" color="error" onClick={() => remove(index)}>
                                            Remove
                                        </Button>
                                    </Grid>
                                </Grid>
                                ))}
                                    <Button mb={4} variant="contained" onClick={() => push({ id: '', quantity: '' })}>
                                        Add Product
                                    </Button>
                                </Grid>
                        )}
                    </FieldArray>
                
                    <Grid item xs={12}>
                    <TextField 
                        fullWidth 
                        size="small"
                        id="shippingDetails" 
                        name="shipping.details" 
                        label="Shipping Details" 
                        variant="outlined" 
                        value={values.shipping.details}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField 
                        fullWidth 
                        size="small"
                        id="shippingInfo" 
                        name="shipping.info" 
                        label="Shipping Info" 
                        variant="outlined" 
                        value={values.shipping.info}
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <LoadingButton type="submit" loading={loading} variant="contained" >
                        Submit
                    </LoadingButton>
                    </Grid>
                </Grid>
          </Form>
        )}
      </Formik>
    );
}

export default NewOrder;