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
import CircularProgress from '@mui/material/CircularProgress';


import {useProductsSlice} from 'src/@core/store/productSlice';
import {useUserStore} from 'src/@core/store/userStore';
import ProductsTable from 'src/views/products/productsTable';
import AddProductForm from 'src/views/products/AddProductForm';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import { AlertStore } from 'src/@core/store/alertSlice';
import { instance } from 'src/@core/hooks/service';
import { useStoreSlice } from 'src/@core/store/storeSlice';
import EditProductForm from 'src/views/products/EditProductForm';




const Products = () => {

    const token = useUserStore((state)=> state.user)
    
    const add = useProductsSlice((state)=> state.add )
    const edit = useProductsSlice((state)=> state.edit )
    const setAdd = useProductsSlice((state)=> state.setAdd )
    const setEdit = useProductsSlice((state)=> state.setEdit )
    const setProducts = useProductsSlice((state)=> state.setProducts )
    const uploadProductCsv = useProductsSlice((state)=> state.uploadProductCsv )
    const stores = useStoreSlice( (state)=> state.stores);
    const setStore = useStoreSlice( (state)=> state.setStore);

    const setMessage = AlertStore((state)=> state.setMessage )
    const setStatus = AlertStore((state)=> state.setStatus )
    const setType = AlertStore((state)=> state.setType )
    
    const [uploadStatus, setUploadStatus] = useState(null);
    const [currentFile, setCurrentFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [store_id, setStoreId] = useState('');

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
            active: ""
        }
        setProducts(data);
    }, [token,setProducts])

    useEffect(() => {
        setStore({
            token,
            store_id: "",
            location: "",
            store: "",
            page: "",
            limit: ""
        })
    }, [token,setStore])

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
                    Products
                </Typography>
                <Stack spacing={5} direction="row">
                    <Button variant="contained" onClick={ ()=> setAdd(!add) }>Add New Product</Button>
                    <Button variant="contained" component="label" >
                        Upload Csv
                        <input hidden accept=".csv" onChange={handleFileSelect} multiple type="file" />
                        {currentFile && (
                            <Box ml={4}>
                                <CircularProgress variant="determinate"  size={20} color='inherit' value={uploadProgress} />
                            </Box>
                        )}
                    </Button>
                    {currentFile && (
                        <>
                            <Grid item xs={2} sm={2}>
                                <FormControl fullWidth size='small'>
                                    <InputLabel id="demo-simple-select-label">Store</InputLabel>
                                    <Select
                                        name='store_id'
                                        value={store_id}
                                        label="Store"
                                        onChange={(e)=> setStoreId(e.target.value)}
                                    >
                                        {
                                            stores?.map(item => (
                                                <MenuItem key={item.store_id} value={item.store_id}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Button variant="outlined"  onClick={handleUpload}><UploadFileIcon/></Button>
                            <Button variant="outlined" color="error" onClick={()=>setCurrentFile(null)}><ClearIcon/></Button>
                        </>
                    )}
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Products Table' titleTypographyProps={{ variant: 'h6' }} />
                    <ProductsTable/>
                    
                    <Modal
                        className={''}
                        open={add}
                        onClose={handleClose}
                    >
                        <Box sx={Boxstyle}>
                            <Box sx={style}>
                            <AddProductForm/>
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
                                <EditProductForm/>
                            </Box>
                        </Box>
                    </Modal>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Products;