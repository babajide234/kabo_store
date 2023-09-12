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
import Chip from '@mui/material/Chip';

import { Grid, Typography, Box, TablePagination,TextField,Button } from '@mui/material'

import {useTeamSlice} from 'src/@core/store/teamStore'

// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DotsVertical  from 'mdi-material-ui/DotsVertical'

import { useUserStore } from 'src/@core/store/userStore'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const createData = (id, name, email ) => {
    return { id, name, email}
}

const rowsPerPageOptions = [5, 10, 25];


const RidersTable = ({Type}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchQuery, setSearchQuery] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // const teams = useTeamSlice(state => state.teams);
    const riders = useTeamSlice(state => state.riders);
    const setEdit = useTeamSlice((state)=> state.setEdit);
    const setView = useTeamSlice((state)=> state.setView);
    const setUserId = useTeamSlice((state)=> state.setUserId);
    const setLoc = useTeamSlice((state)=> state.setLoc);
    const getLocation = useTeamSlice((state)=> state.getLocation);
    const token = useUserStore((state)=> state.user);

    const rows = riders?.map((data)=>{
        const row = createData(
            data.team_id,
            data.fullname,
            data.email,
        )

        return row
    })

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;

    const handleEdit =(id)=>{
        console.log(id)
        setUserId(id)
        setEdit(true);
    }

    const handleView =(id)=>{
        console.log(id)
        setUserId(id)
        setView(true);
    }

    const handleMap =(id)=>{
        console.log(id)
        
        getLocation({
            email : id
        })
        setLoc(true);
    }
    
    const button = (id) =>{
        return(
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <DotsVertical />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch'
                    }
                }}
            >
                    <MenuItem onClick={() => handleEdit(id)}>Edit</MenuItem>
            </Menu>
        </>
        )
    }
  
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

    const filteredData = rows?.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
    });

    return (
        <TableContainer component={Paper}>
            <Grid mb={5} mx={5} mt={5} sx={{ display: "flex", justifyContent:"end", alignItems:"center" }}>            
               <TextField size="small" label="Search" value={searchQuery} onChange={handleSearchChange} />
            </Grid>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                {
                    !rows ? (
                        <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                        <Typography variant='h5'>
                            No Riders
                        </Typography>
                        </Box>
                    ) : (
                        <>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Email</TableCell>
                                    <TableCell align='right'>Action</TableCell> 
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-of-type td, &:last-of-type th': {
                                            border: 0
                                            }
                                        }}
                                    >
                                        <TableCell component='th' scope='row'>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align='right'>{row.email}</TableCell>
                                        <TableCell align='right'>{
                                            <>
                                                <IconButton variant="outlined" style={{ marginRight: 10}} size="small" onClick={()=>handleEdit(row.email)}>
                                                    <Typography variant="caption" sx={{ fontSize: '10px' }}>
                                                        <EditIcon/>
                                                    </Typography>
                                                </IconButton>
                                                <IconButton variant="outlined" style={{ marginRight: 10}} size="small" onClick={()=>handleView(row.email)}>
                                                    <Typography variant="caption" sx={{ fontSize: '10px' }}>
                                                        <VisibilityIcon/>
                                                    </Typography>
                                                </IconButton>
                                                <IconButton variant="outlined" size="small" onClick={()=>handleMap(row.email)}>
                                                    <Typography variant="caption" sx={{ fontSize: '10px' }}>
                                                        <FmdGoodIcon/>
                                                    </Typography>
                                                </IconButton>
                                            </>
                                        }</TableCell>
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
                    )
                }
            </Table>
        </TableContainer>
    );
}



export default RidersTable;