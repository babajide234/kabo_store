import { Formik } from "formik";
import { 
    Grid, 
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CardContent,
    Button, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio 
} from "@mui/material";

import { 
    LoadingButton
} from "@mui/lab";
import { useTeamSlice } from "src/@core/store/teamStore";
import { useUserStore } from "src/@core/store/userStore";


const ProfileForm = ({ data }) => {
    const editTeam = useTeamSlice( (state) => state.editTeam )
    const token = useUserStore( (state) => state.user )
    const details = useUserStore( (state) => state.details )
    const loading = useTeamSlice( (state) => state.loading )
    const userId = useTeamSlice( (state) => state.userId )
    const updateProfile = useTeamSlice( (state) => state.updateProfile )

    const handleSubmit = (values)=>{
        updateProfile(
            {
                token,
                management: "Yes" , 
                account_id: values.email ,
                store_id: details.store_id.admin ? details.store_id.admin : '',
                email: values.email ,
                phone: values.phone ,
                username: values.username ,
                lastname: values.lastname ,
                othernames: values.othernames ,
                gender: values.gender , 
                address: values.address ,
                dob: values.dob ,
                nin: values.nin ,
                bvn: values.bvn 
            }
        )
    }

    return (
        <CardContent>
            <Formik initialValues = {
                    {
                        account_id: data ? data.account_id : "",
                        email: data ? data.email : "",
                        phone: data ? data.phone : "",
                        username: data ? data.username : "",
                        lastname: data ? data.lastname : "",
                        othernames: data ? data.othernames : "",
                        gender: data ? data.gender : "", 
                        address: data ? data.address : "",
                        dob: data ? data.dob : "",
                        nin: data ? data.nin : "",
                        bvn: data ? data.bvn : ""
                    }
                } 
                enableReinitialize={true} 
                onSubmit={handleSubmit}
            >
            {({values, handleSubmit,handleChange}) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={7}>
                        {/* <Grid item xs={12} md={6}>
                            <TextField
                                id="managemenet"
                                name="managemenet"
                                label="Management"
                                value={values.managemenet}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="account_id"
                                name="account_id"
                                label="Account ID"
                                value={values.account_id}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid> */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                value={values.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="phone"
                                name="phone"
                                label="Phone"
                                value={values.phone}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                value={values.username}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="lastname"
                                name="lastname"
                                label="Last Name"
                                value={values.lastname}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="othernames"
                                name="othernames"
                                label="Other Names"
                                value={values.othernames}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                id="gender"
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                row
                            >
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            multiline
                            minRows={3}
                            id="address"
                            name="address"
                            label="Address"
                            value={values.address}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                fullwidth
                                id="dob"
                                name="dob"
                                label="Date of Birth"
                                type="date"
                                value={values.dob}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={4}>

                            <TextField
                                fullwidth
                                id="nin"
                                name="nin"
                                label="NIN"
                                value={values.nin}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={4}>

                            <TextField
                                fullwidth
                                id="bvn"
                                name="bvn"
                                label="BVN"
                                value={values.bvn}
                                onChange={handleChange}
                                margin="normal"
                            />
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

export default ProfileForm;