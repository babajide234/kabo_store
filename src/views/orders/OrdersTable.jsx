import React, { useState, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DotsVertical  from 'mdi-material-ui/DotsVertical'

import { Grid, Typography, Box, TablePagination,TextField } from '@mui/material'

import { orderSlice } from 'src/@core/store/orderSlice'
import { useUserStore } from 'src/@core/store/userStore'
import { format } from 'date-fns';


const createData = ( status, time, amount,ref,pay_status ) => {
    return { status, time, amount,ref,pay_status }
}
const rowsPerPageOptions = [5, 10, 25];

const OrdersTable = ({ type }) => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchQuery, setSearchQuery] = useState('');

    const setEdit = orderSlice((state)=> state.setEdit);
    const setView = orderSlice((state)=> state.setView);
    const edit = orderSlice((state)=> state.edit);
    const setOrderRef = orderSlice((state)=> state.setOrderRef);
    const orders = orderSlice((state)=>state.orders)
    const setOrder = orderSlice((state)=>state.setOrder)
    const storeRef= orderSlice((state)=> state.storeRef )
    const setSingleOrder = orderSlice((state)=> state.setSingleOrder )
    const loading = orderSlice((state)=> state.loading )

    const token = useUserStore((state)=>state.user)
    const details = useUserStore((state)=>state.details)
    const { role }= details;

    const [userRole,setUserRole] = useState('')

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      setPage(0);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = format(date, 'EEEE dd MMMM yyyy');

        return formattedDate;
        
    };

    const rows = orders?.map((data)=>{
        const row = createData(
            data.order_status,
            type == "Pending" ? data.payment_timestamp:data.order_timestamp,
            data.amount.total, 
            data.reference_code, 
            data.payment_status
        )

        return row
    })

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;

    const handleEdit = (id) => {
        console.log(id)
        setEdit(!edit);
        setOrderRef(id);
    }

    const handleDetails = (id) => {
        console.log(id)
        setView(!edit);
        setOrderRef(id);
    }
    

    useEffect(() => {
        const data ={
            token: token,
            reference_code: "",
            account: "store", 
            from: "",
            to: "",
            payment_status: "",
            order_status: type 
        }

        setOrder(data)
    }, [token,setOrder, type])



         
    useEffect(()=>{
        const data ={
            token: token,
            reference_code: storeRef,
            account: "store", 
            from: "",
            to: "",
            payment_status: "",
            order_status: type 
        }

        setSingleOrder(data)
    },[token, type, setSingleOrder, storeRef])

    const filteredData = rows?.filter((item) => {
        // return (
        //   item.status.toLowerCase().includes(searchQuery.toLowerCase()) || 
        //   item.time.toLowerCase().includes(searchQuery.toLowerCase()) || 
        //   item.amount.toLowerCase().includes(searchQuery.toLowerCase()) || 
        //   item.ref.toLowerCase().includes(searchQuery.toLowerCase()) 
        // );
    });

    return (
        <TableContainer component={Paper}>
            <Grid mb={5} mt={5} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
                <TextField size="small" label="Search" value={searchQuery} onChange={handleSearchChange} />
            </Grid>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    {
                        orders && !loading ? (
                            <>
                                <TableHead >
                                    <TableRow>
                                        <TableCell >Order Reference</TableCell>
                                        <TableCell >Order Status</TableCell>
                                        <TableCell align='right'>Order Time</TableCell>
                                        <TableCell align='right'>Amount</TableCell>
                                        <TableCell align='right'>Payment Status</TableCell>
                                        <TableCell align='right'>Action</TableCell> 
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell component='th' scope='row'>{item.ref}</TableCell>
                                            <TableCell >{item.status}</TableCell>
                                            <TableCell align='right'>{formatDate(item.time)}</TableCell>
                                            <TableCell align='right'>{item.amount }</TableCell>
                                            <TableCell align='right'>{item.pay_status}</TableCell>
                                            <TableCell align='right'>
                                                    {
                                                        item.status == 'Pending' ? (
                                                            <>
                                                                <Button mr={10} variant="outlined" size="small" onClick={()=>handleEdit(item.ref)} sx={{ marginRight:10}}>
                                                                    <Typography variant="caption" sx={{ fontSize: '10px' }}>
                                                                        Assign Rider
                                                                    </Typography>
                                                                </Button>

                                                                <Button variant="outlined" size="small" onClick={()=>handleDetails(item.ref)}>
                                                                <Typography variant="caption" sx={{ fontSize: '10px' }}>
                                                                    View Details
                                                                </Typography>
                                                                </Button>
                                                            </>
                                                        ):(
                                                            item.status == 'Delivering' ?
                                                            (
                                                                <> </>
                                                            ) : (
                                                            <Button variant="outlined" size="small" onClick={()=>handleDetails(item.ref)}>
                                                                <Typography variant="caption" sx={{ fontSize: '10px' }}>
                                                                   View Details
                                                                </Typography>
                                                            </Button>
                                                            )
                                                        )
                                                    }
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TablePagination
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    count={rows.length}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}

                                />
                            </>
                        ):(
                            <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                                <Typography variant='h5'>
                                    { loading ? 
                                    "Loading..."
                                     : `No ${type} Order`}
                                </Typography>
                            </Box>
                        )
                    }
            </Table>
        </TableContainer>
    );
}

export default OrdersTable;