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
} from '@mui/material/'
import Button from '@mui/material/Button';

import { useStoreSlice } from 'src/@core/store/storeSlice';
import { useUserStore } from 'src/@core/store/userStore';
import AddStoresForm from 'src/views/stores/AddStoresForm';
import StoresTable from 'src/views/stores/StoreTable';
import EditStoreForm from 'src/views/stores/EditStoreForm';

const Stores = () => {
    const token = useUserStore((state)=> state.user)
    const add = useStoreSlice((state)=> state.add )
    const edit = useStoreSlice((state)=> state.edit )
    const setAdd = useStoreSlice((state)=> state.setAdd )
    const setEdit = useStoreSlice((state)=> state.setEdit )
    const setStore = useStoreSlice((state)=> state.setStore )

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
        const data ={
            token: token,
            store_id: "",
            location: "",
            store: "",
            page: "",
            limit: ""
        }
        setStore(data);
    }, [token,setStore])
    
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
                    Stores
                </Typography>
                {/* <Button variant="contained" onClick={ ()=> setAdd(!add) }>Add New Stores</Button> */}
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Stores Table' titleTypographyProps={{ variant: 'h6' }} />

                    <StoresTable/>

                    <Modal
                        className={''}
                        open={edit}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <EditStoreForm/>
                        </Box>
                    </Modal>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Stores;