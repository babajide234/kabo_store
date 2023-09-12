import { useState } from 'react'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
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

import {useTeamSlice} from 'src/@core/store/teamStore'

// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DotsVertical  from 'mdi-material-ui/DotsVertical'
import { TablePagination } from '@mui/material'

const createData = (id, name, email, role ) => {
    return { id, name, email,  role}
}

const rowsPerPageOptions = [ 5, 10, 25];


const TeamsTable = ({Type}) => {

    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [page, setPage] = useState(0);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const teams = useTeamSlice(state => state.teams);
    const rider = useTeamSlice(state => state.rider);
    const setEdit = useTeamSlice((state)=> state.setEdit);

    const rows = teams?.map((data)=>{
        const row = createData(
            data.team_id,
            data.fullname,
            data.email,
            data.role, 
        )

        return row
    })

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleEdit =(id)=>{
        console.log(id)
        setEdit(true);
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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                {
                    !rows ? (
                        <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                            <Typography variant='h5'>
                                No Manager
                            </Typography>
                        </Box>
                    ) : (
                        <>                        
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Email</TableCell>
                                    <TableCell align='right'>Role</TableCell>
                                    <TableCell align='right'>Action</TableCell> 
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows && rows.map(row => (
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
                                        <TableCell align='right'><Chip label={row.role} /></TableCell>
                                        <TableCell align='right'>
                                            {
                                            <Button variant="outlined" style={{ marginRight: 10}} size="small" onClick={()=>handleEdit(row.email)}>
                                                edit
                                            </Button>
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
                    )
                }
            </Table>
        </TableContainer>
    );
}



export default TeamsTable;