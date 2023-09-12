import { useState,useEffect } from 'react';
import { 
    Grid,
    Link,
    Card,
    Typography,
    CardHeader,
    Modal,
    Box,
    Paper,
    Button
} from '@mui/material/'


import { useTeamSlice } from 'src/@core/store/teamStore';
import { useUserStore } from 'src/@core/store/userStore';
import CustomerTable from 'src/views/customers/CustomerTable';

const Customers = () => {

    const token = useUserStore((state)=> state.user)
    const setCustomers = useTeamSlice((state)=> state.setCustomers)

    const edit = useTeamSlice((state)=> state.edit);
    const add = useTeamSlice((state)=> state.add);
    const setEdit = useTeamSlice((state)=> state.setEdit);
    const setAdd = useTeamSlice((state)=> state.setAdd);

    const style = {
        position:"absolute",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-50%)",
        width:600,
        minHeight:100,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius: "10px",
        paddingBlock: 20,
        paddingInline: 20
    }
    
    useEffect(() => {
    
        const data = {
            token: token,
            email: "",
        }
        
        setCustomers(data);

    }, [token,setCustomers])

    const handleClose = () =>{
        if( add ){
            setAdd(!add)
        }
        if(edit){
            setEdit(!edit);
        }
    }

    return (
        <Grid container spacing={6} >
        <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
            <Typography variant='h5'>
                Customers
            </Typography>
            {/* <Button variant="contained" onClick={ ()=> setAdd(!add) }>Customers</Button> */}
        </Grid>
        <Grid item xs={12}>
            <Card>
                <CardHeader title='Customers' titleTypographyProps={{ variant: 'h6' }} />

                <CustomerTable/>

                <Modal
                    className={''}
                    open={edit}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        {/* <TeamEditForm/> */}
                    </Box>
                </Modal>

                <Modal
                    className={''}
                    open={add}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        {/* <TeamAddForm/> */}
                    </Box>
                </Modal>
            </Card>
        </Grid>
    </Grid>
    );
}

export default Customers;