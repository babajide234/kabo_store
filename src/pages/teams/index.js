import { useState,useEffect,useRef } from 'react';
import { 
    Grid,
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
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import TeamsTable from 'src/views/teams/TeamsTable';
import TeamEditForm from 'src/views/teams/TeamEditForm';
import TeamAddForm from 'src/views/teams/TeamAddForm';

import {useTeamSlice} from 'src/@core/store/teamStore';
import {useUserStore} from 'src/@core/store/userStore';

const Teams = (params) => {
    
    // const [open, setOpen]= useState(false);
    const [scroll, setScroll] = useState('paper');
    const descriptionElementRef = useRef(null);

    const token = useUserStore((state)=> state.user)
    const setTeams = useTeamSlice((state)=> state.setTeams)
    const edit = useTeamSlice((state)=> state.edit);
    const add = useTeamSlice((state)=> state.add);
    const setEdit = useTeamSlice((state)=> state.setEdit);
    const setAdd = useTeamSlice((state)=> state.setAdd);

    
    const style = {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius: "10px",
        paddingTop: 3,
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
        paddingTop: 0,
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
    
        const data = {
            token: token,
            email: "",
            role:"admin"
        }
        
        setTeams(data);

    }, [token,setTeams])

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
                    Managers
                </Typography>
                <Button variant="contained" onClick={ ()=> setAdd(!add) }>Add New Managers</Button>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Managers Table' titleTypographyProps={{ variant: 'h6' }} />

                    <TeamsTable/>

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
                        <DialogTitle id="scroll-dialog-title">Edit Managers</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                <TeamEditForm type='admin'/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <Modal
                        className={''}
                        open={add}
                        onClose={handleClose}
                    >
                        <Box sx={Boxstyle}>
                            <Box sx={style}>
                                <TeamAddForm from="admin"/>
                            </Box>
                        </Box>
                    </Modal>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Teams;