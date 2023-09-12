import { useState,useEffect } from 'react';
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
    Card,
    CardHeader,
    Box,
    Modal
} from '@mui/material/'
import Stack from '@mui/material/Stack';


import {useUserStore} from 'src/@core/store/userStore';
import { AlertStore } from 'src/@core/store/alertSlice';
import { instance } from 'src/@core/hooks/service';
import LogisticsTable from 'src/views/logistics/logisticsTable';
import { logisticsSlice } from 'src/@core/store/logisticsSlice';
import AddLog from 'src/views/logistics/AddLog';
import EditLog from 'src/views/logistics/EditLog';



const Logistics= () => {

    const token = useUserStore((state)=> state.user)
    
    const add = logisticsSlice((state)=> state.add )
    const edit = logisticsSlice((state)=> state.edit )
    const setAdd = logisticsSlice((state)=> state.setAdd )
    const setEdit = logisticsSlice((state)=> state.setEdit )
    const list = logisticsSlice((state)=> state.list )
    const logs = logisticsSlice( (state)=> state.stores);

    // const getLog = logisticsSlice( (state)=> state.setStore);

    const setMessage = AlertStore((state)=> state.setMessage )
    const setStatus = AlertStore((state)=> state.setStatus )
    const setType = AlertStore((state)=> state.setType )
    

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
        paddingTop: 45,
        paddingInline: 15,
        overflowY:"auto",
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            width: '8px', 
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#640501', 
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

    useEffect(() => {
        const data ={
            token: token,
            id: "",
        }
        list(data);
    }, [token,list])

    // useEffect(() => {
    //     setStore({
    //         token,
    //         store_id: "",
    //         location: "",
    //         store: "",
    //         page: "",
    //         limit: ""
    //     })
    // }, [token,setStore])

    const handleClose = () =>{
        if( add ){
            setAdd(!add)
        }
        if(edit){
            setEdit(!edit);
        }
    }

    const handleFileSelect = (event) => {
      setCurrentFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('token', token);
        formData.append('file', currentFile);
    
        try {
          const response = await instance.post('misc/file-upload', formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setUploadProgress(percentCompleted);
              },
          });
          
          console.log(response);
          
          if(response.data.status == "success"){
            
            setUploadProgress(0)

            const res = instance.post('store/upload-products',{
                  token:token,
                  store_id:store_id,
                  file_url:response.data.file_url
            })
            
            if(res.data.status == "success"){
                setFileUrl(res.data.file_url)
                setUploadStatus('success');
                setMessage(res.data.message);
                setStatus(true);
                setType('success');
                setCurrentFile(null);
                
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
            }
          }else{
              setUploadStatus('failed');
              setMessage(response.data.message);
              setStatus(true);
              setType('error');
          }
  
          // Do something with the response data if needed
  
        } catch (error) {
          console.error(error);
          setUploadStatus('failed');
  
          // Handle error if needed
        }
    };

    return (
        <Grid container spacing={6} >
            <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
                <Typography variant='h5'>
                    Logistics
                </Typography>
                <Stack spacing={5} direction="row">
                    <Button variant="contained" onClick={ ()=> setAdd(!add) }>Add New Distance</Button>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Logistics Table' titleTypographyProps={{ variant: 'h6' }} />
                    <LogisticsTable/>
                    
                    <Modal
                        className={''}
                        open={add}
                        onClose={handleClose}
                    >
                        <Box sx={Boxstyle}>
                            <Box sx={style}>
                                <AddLog/>
                            </Box>
                        </Box>
                    </Modal>
                    <Modal
                        className={''}
                        open={edit}
                        onClose={handleClose}
                    >
                        <Box sx={Boxstyle}>
                            <Box sx={style}>
                               <EditLog/>
                            </Box>
                        </Box>
                    </Modal>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Logistics
;