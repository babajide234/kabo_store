import { useEffect, useState } from "react";
import { 
    Grid,
    Link,
    Card,
    Typography,
    CardHeader,
    Modal,
    Box,
    Paper,
    Button,
    Tabs,
    Tab
} from '@mui/material/'

import { orderSlice } from "src/@core/store/orderSlice";
import { useUserStore } from "src/@core/store/userStore";

import AssignRider from 'src/views/orders/AssignRider';
import OrdersTable from 'src/views/orders/OrdersTable';
import OrderDetials from "src/views/orders/OrderDetials";



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  

const Order = () => {
    
    const edit = orderSlice((state)=>state.edit)
    const view = orderSlice((state)=>state.view)
    const add = orderSlice((state)=>state.add)
    const setEdit = orderSlice((state)=> state.setEdit )
    const setAdd = orderSlice((state)=> state.setAdd )
    const setView= orderSlice((state)=> state.setView )
    const order= orderSlice((state)=> state.setView )
    const setSingleOrder = orderSlice((state)=> state.setSingleOrder )

    // const classes = useStyles();
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };



    const handleClose = () =>{
        if(edit){
            setEdit(!edit);
        }
        if(add){
            setAdd(!add);
        }
        if(view){
            setView(!view);
        }
    }

    const style = {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius: "10px",
        paddingTop: 20,
        marginBottom:20
    }

    const Boxstyle = {
        position:"absolute",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-50%)",
        width:600,
        height:"80vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius: "10px",
        paddingTop: 5,
        paddingInline: 15,
        overflowY:"auto",
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            width: '8px', 
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#0d0a63', 
            borderRadius: '4px', 
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)', 
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#fff', 
            borderRadius: '4px', 
        }
    }

    return (
        <Grid container spacing={6} >
        <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
            <Typography variant='h5'>
                Customer Orders
            </Typography>
        </Grid>

        <Grid item xs={12}>
            <Card>
                <div>
                <Tabs value={value} onChange={handleChange} aria-label="Order tabs">
                    <Tab label="Pending" />
                    <Tab label="Delivering" />
                    <Tab label="Delivered" />
                    <Tab label="Successful" />
                    <Tab label="Failed" />
                </Tabs>
                    <TabPanel value={value} index={0}>
                        <OrdersTable type={'Pending'}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <OrdersTable type={'Delivery'}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <OrdersTable type={'Delivered'}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <OrdersTable type={'Successful'}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <OrdersTable type={'Failed'}/>
                    </TabPanel>
                </div>
            </Card>
        </Grid>
        <Modal
            className={''}
            open={view}
            onClose={handleClose}
        >
            <Box sx={Boxstyle}>
                <Box sx={style}>
                    <OrderDetials/>
                </Box>
            </Box>
        </Modal>
         
        <Modal
            className={''}
            open={edit}
            onClose={handleClose}
        >
            <Box sx={Boxstyle}>
                <AssignRider/>
            </Box>
        </Modal>
    </Grid>
    );
}

export default Order;