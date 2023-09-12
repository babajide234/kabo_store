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
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ActivityStore } from 'src/@core/store/activitySlice'

const createData = (
    fullname,
    url,
    details,
    status,
) => {
    return { 
        fullname,
        url,
        details,
        status,
    }
}


const ActivityTable = ({Type}) => {


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };


    const activities = ActivityStore((state)=> state.activities);

    const rows = activities?.map((data)=>{
        const row = createData(
            data.fullname,
            data.url,
            data.details,
            data.status, 
        )

        return row
    })

    console.log("rows", rows);

    const ITEM_HEIGHT = 48;

    const handleEdit =(id)=>{
        console.log(id)
        setEdit(true);
    }
 

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                {
                    !rows ? (
                        <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                            <Typography variant='h5'>
                                No Activities
                            </Typography>
                        </Box>
                    ) : (
                        <>                        
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Url</TableCell>
                                    <TableCell align='right'>Details</TableCell>
                                    <TableCell align='right'>Status</TableCell> 
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
                                            {row.fullname}
                                        </TableCell>
                                        <TableCell align='right'>{row.url}</TableCell>
                                        <TableCell align='right'>{row.details}</TableCell>
                                        <TableCell align='right'>
                                            <Chip 
                                                label={row.status}
                                                icon={ row.status == "success" ?  <DoneIcon /> : <CloseIcon/>}
                                                color={ row.status == "success" ? "success" : "error" }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </>
                    )
                }
            </Table>
        </TableContainer>
    );
}



export default ActivityTable;