import { useState,useEffect,useRef } from 'react';
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
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import TeamsTable from 'src/views/teams/TeamsTable';
import TeamEditForm from 'src/views/teams/TeamEditForm';
import TeamAddForm from 'src/views/teams/TeamAddForm';

import { useTeamSlice } from 'src/@core/store/teamStore';
import { useUserStore } from 'src/@core/store/userStore';
import RidersTable from 'src/views/rider/RiderTable';
import RiderLocation from 'src/views/teams/RiderLocation';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import RiderDetails from 'src/views/teams/RiderDetails';

const Rider = () => {

    const [open, setOpen]= useState(true);
    const [scroll, setScroll] = useState('paper');
    const descriptionElementRef = useRef(null);
    const detailsRef = useRef(null);


    useEffect(() => {
        if (edit) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [edit]);

    const token = useUserStore((state)=> state.user)
    const { role } = useUserStore((state)=> state.details)
    const setRider = useTeamSlice((state)=> state.setRider)
    
    const edit = useTeamSlice((state)=> state.edit);
    const add = useTeamSlice((state)=> state.add);
    const view = useTeamSlice((state)=> state.view);
    const loc = useTeamSlice((state)=> state.loc);
    const setLoc = useTeamSlice((state)=> state.setLoc);
    const setEdit = useTeamSlice((state)=> state.setEdit);
    const setAdd = useTeamSlice((state)=> state.setAdd);
    const setView = useTeamSlice((state)=> state.setView);

    const style = {
        position:"absolute",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-50%)",
        width:"70vw",
        height:"80vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
            borderRadius: "10px",
            paddingBlock: 20,
            paddingInline: 20,
        overflowY:"auto"
        
    }
    
    useEffect(() => {
        const data ={
            token,
            email: "",
            role:"rider",
            type: role.admin == "Yes" ? "Admin" : "SuperAdmin" 
        }
        
        setRider(data);

    }, [token,setRider,role])
    
    const handleClose = () =>{
        if( add ){
            setAdd(!add)
        }
        if(edit){
            setEdit(!edit);
        }
        if(loc){
            setLoc(!loc);
        }
        if(view){
            setView(!view);
        }
    }

    const handleViewClose = () =>{
        
        setOpen(!open)
        
    }

    return (
        <Grid container spacing={6}  >
            <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
                <Typography variant='h5'>
                    Rider
                </Typography>
                <Button variant="contained" onClick={ ()=> setAdd(!add) }>Add New Rider</Button>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Riders Table' titleTypographyProps={{ variant: 'h6' }} />

                    <RidersTable/>

                    <Dialog
                        fullScreen
                        open={edit}
                        onClose={handleClose}
                        scroll={scroll}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <DialogTitle id="scroll-dialog-title">Edit Rider</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                <TeamEditForm type='rider'/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <Modal
                        className={''}
                        open={loc}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <RiderLocation/>
                        </Box>
                    </Modal>

                    <Modal
                        className={''}
                        open={add}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <TeamAddForm from={"rider"}/>
                        </Box>
                    </Modal>

                    <Dialog
                        fullScreen
                        open={view}
                        onClose={handleClose}
                        scroll={scroll}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <DialogTitle id="scroll-dialog-title">Details</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={detailsRef}
                                tabIndex={-1}
                            >
                                <RiderDetails type="rider"/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </Card>

            </Grid>
        </Grid>
    );
}

export default Rider;