import { Formik } from "formik";
import { 
    Grid, 
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CardContent
} from "@mui/material";

import { 
    LoadingButton
} from "@mui/lab";
import { useTeamSlice } from "src/@core/store/teamStore";
import { useUserStore } from "src/@core/store/userStore";


const StatusForm = ({ type }) => {
    const editTeam = useTeamSlice( (state) => state.editTeam )
    const token = useUserStore( (state) => state.user )
    const loading = useTeamSlice( (state) => state.loading )
    const userId = useTeamSlice( (state) => state.userId )

    const handleSubmit = (values) =>{
        
        const data = {
            token,
            team_id: userId,
            active: values.active, 
            role: type.role
        }

        editTeam(data)
    }

    return (
        <CardContent>
            <Formik initialValues={{ active: type ? type.status :"" }} enableReinitialize={true} onSubmit={handleSubmit}>
            {({values, handleSubmit,handleChange}) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    name='active'
                                    label="Status"
                                    value={values.active}
                                    onChange={handleChange}
                                >
                                    
                                    <MenuItem  value='Yes'>Yes</MenuItem>
                                    <MenuItem  value='No'>No</MenuItem>
                                
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                                Update
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
            </Formik>
        </CardContent>
    );
}

export default StatusForm;