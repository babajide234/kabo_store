import { useState,useEffect } from 'react';
import { 
    Grid,
    Typography,
    Button,
    Card,
    CardHeader,
    Box,
    Modal,
    Stack
} from '@mui/material/'
import { ActivityStore } from 'src/@core/store/activitySlice';
import { useUserStore } from 'src/@core/store/userStore';
import useSWR from 'swr'
import ActivityTable from 'src/views/activity/ActivityTable';

const Activity = () => {

    const token = useUserStore((state) => state.user);
    const getActivities = ActivityStore((state) => state.getActivities);

    const payload = {
        token: token,
        status: "",
        email: "",
        from: "",
        to: "",
        orderBy: ""
    };

    const { data, error, isLoading  } = useSWR('/api/log', getActivities(payload))

    return (
        <Grid container spacing={6} >
            <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
                <Typography variant='h5'>
                    Activity Log
                </Typography>
                <Stack spacing={5} direction="row">
                    {/* <Button variant="contained" onClick={ ()=> setAdd(!add) }>Add New Distance</Button> */}
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Logistics Table' titleTypographyProps={{ variant: 'h6' }} />
                    <ActivityTable/>
                    
                    
                </Card>
            </Grid>
        </Grid>
    );
}

export default Activity;