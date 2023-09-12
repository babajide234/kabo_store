import { 
    Box, 
    Typography,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    Menu,
    MenuItem,
    IconButton,
    Button
 } from '@mui/material/'
import { VerifyStore } from 'src/@core/store/verifyStore';

const createData = (id,code,type  ) => {
    return { id, code,type    }
}

const VerifyTable = () => {
    const verifiedUsers = VerifyStore((state)=> state.verifiedUsers);
    const setStoreId = VerifyStore((state)=> state.setStoreId);
    const setCheck = VerifyStore((state)=> state.setCheck);
    const check = VerifyStore((state)=> state.check);
    const verifycheck = VerifyStore((state)=> state.verifycheck);

    const store = verifiedUsers?.filter((item) => item.accountInfo.account == "store");

    const rows = verifycheck?.map((data)=>{

        const row = createData(
            data.kyc_id,
            data.code,
            data.type,
        )

        return row
    })

    console.log("rows", rows);
    const ITEM_HEIGHT = 48;

    const handleEdit = (id) => {
        console.log(id)
        setCheck(!check);
        setStoreId(id);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                {
                    !rows ? (
                        <Box sx={{ display:"flex", justifyContent: "center", alignItems:"center", width:"100%", height: "20vh"}}>
                        <Typography variant='h5'>
                            No Stores
                        </Typography>
                        </Box>
                    ):(
                        <>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell align='right'>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            '&:last-of-type td, &:last-of-type th': {
                                            border: 0
                                            }
                                        }}
                                    >
                                        <TableCell component='th' scope='row'>{row.code}</TableCell>
                                        <TableCell align='right'>{row.type ? row.type : "null"}</TableCell>
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

export default VerifyTable;