import { orderSlice } from "src/@core/store/orderSlice";
import {
    Grid,
    List,
    ListItem, 
    Typography, 
    Box,
    CircularProgress
} from '@mui/material'

const OrderDetials = () => {
    const order = orderSlice((state)=> state.order )
    order = order ? order[0] : null;


    return (
        <Box>
            {
                order  ? (
                    <Grid container spacing={7} >
                    <Grid item xs={12} mt={20}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="h5">Store Details</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="">Store:</Typography>
                            <Typography variant="caption">{ order.store[0].name }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} mt={20}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="h5">Customer Details</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="">Customer name:</Typography>
                            <Typography variant="caption">{ order.customer[0].othernames } { order.customer[0].lastname }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="">Phone:</Typography>
                            <Typography variant="caption">{ order.customer[0].phone }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="">Address:</Typography>
                            <Typography variant="caption">{ order.shipping[0].address }</Typography>
                        </Box>
                    </Grid>
    
    
                    <Grid item xs={12} mt={10}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="h5">Order Details</Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="">Order Status:</Typography>
                            <Typography variant="caption">{ order.order_status }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="">Order Timestamp:</Typography>
                            <Typography variant="caption">{ order.order_timestamp }</Typography>
                        </Box>
                    </Grid>

                    {/* <Grid item xs={12}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="">Payment Status:</Typography>
                            <Typography variant="caption">{ order.payment_status }</Typography>
                        </Box>
                    </Grid> */}

                    <Grid item xs={12} mt={10}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="h5">Product Details</Typography>
                        </Box>
                    </Grid>
                    {
                        order.product.map(item => (
                            <Grid container item key={item.id}>
                                <Grid item xs={12}>
                                    <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                                        <Typography variant="">Product Name:</Typography>
                                        <Typography variant="caption">{ item.name }</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                                        <Typography variant="">Product price:</Typography>
                                        <Typography variant="caption">{ item.amount }</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        ))
                    }
    
                    {/* <Grid item xs={12}>
                        <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                            <Typography variant="">Payment Status:</Typography>
                            <Typography variant="caption">{ order.payment_status }</Typography>
                        </Box>
                    </Grid> */}
                </Grid>
                ):(
                    <Box sx={{ display:"flex", justifyContent:'space-between' }}>
                        <CircularProgress/>
                    </Box>

                )
            }

        </Box>
    );
}

export default OrderDetials;