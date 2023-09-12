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
import { VerifyStore } from 'src/@core/store/verifyStore';
import { useUserStore } from 'src/@core/store/userStore';
import VerifyTable from '../../views/verification/verifyTable';
import VerifyCheck from 'src/views/verification/VerifyCheck';

VerifyStore

const Verification = () => {
    const [open,setOpen] = useState(false);

    const getVerifications = VerifyStore((state)=> state.getVerifications);
    const getTrack = VerifyStore((state)=> state.getTrack);
    const verifiedUsers = VerifyStore((state)=> state.verifiedUsers);
    const check = VerifyStore((state)=> state.check )
    const setCheck = VerifyStore((state)=> state.setCheck);

    const token = useUserStore((state)=> state.user )


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
            account: "store",
        }
        getTrack(data);
    }, [token,getTrack])

    const handleClose = () =>{
        if( check ){
            setCheck(!check)
        }
    }

    return (
        <Grid container spacing={6} >
        <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
            <Typography variant='h5'>
                Verifications
            </Typography>
            {/* <Button variant="contained" onClick={ ()=> setAdd(!add) }>Add New Stores</Button> */}
        </Grid>
        <Grid item xs={12}>
            <Card>
                <CardHeader title='Verifications Table' titleTypographyProps={{ variant: 'h6' }} />
                <VerifyTable/>

                <Modal
                    className={''}
                    open={check}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <VerifyCheck/>
                    </Box>
                </Modal>
                
                {/* <Modal
                    className={''}
                    open={edit}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                    </Box>
                </Modal>  */}
            </Card>
        </Grid>
    </Grid>
    );
}

export default Verification;