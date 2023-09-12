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
import { Formik, Form, Field } from 'formik';

import { 
    LoadingButton
} from "@mui/lab";
import { useTeamSlice } from "src/@core/store/teamStore";
import { useUserStore } from "src/@core/store/userStore";

const NextofKinForm = ({ data }) => {


    const editTeam = useTeamSlice( (state) => state.editTeam )
    const token = useUserStore( (state) => state.user )
    const loading = useTeamSlice( (state) => state.loading )
    const userId = useTeamSlice( (state) => state.userId )
    const updateNok = useTeamSlice( (state) => state.updateNok )
    const details = useUserStore( (state) => state.details )

    const initialValues = {
        nok_lastname:  data ? data.nok_lastname :'',
        nok_othernames: data ? data.nok_othernames :'',
        nok_address:  data ? data.nok_address :'',
        nok_phone:  data ? data.nok_phone :'',
        nok_valid_license: data ? data.nok_valid_license : ''
      };

      const handleSubmit = (values) => {
        console.log(values);
        updateNok({
            token,
            management: "Yes",
            store_id: details.store_id.admin ? details.store_id.admin : '',
            account_id:userId,
            email: userId,
            nok_lastname: values.nok_lastname,
            nok_othernames: values.nok_othernames,
            nok_phone: values.nok_phone,
            nok_address: values.nok_address
        })
      };

    return (
        <CardContent>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={7}>
                        <Grid item xs={4}>
                            <Field
                            name="nok_lastname"
                            as={TextField}
                            fullWidth
                            label="Last Name"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                            name="nok_othernames"
                            as={TextField}
                            fullWidth
                            label="Other Names"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Field
                                name="nok_address"
                                as={TextField}
                                fullWidth
                                multiline
                                maxRows={3}
                                label="Address"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                            name="nok_phone"
                            as={TextField}
                            fullWidth
                            label="Phone Number"
                            />
                        </Grid>
                        {/* <Grid item xs={4}>
                            <Field
                            name="nok_valid_license"
                            as={TextField}
                            fullWidth
                            label="Valid License"
                            />
                        </Grid> */}
                        <Grid item xs={8} >
                            <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                                Update Next Of Kin Details
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Form>
                )}
            </Formik>
        </CardContent>
    );
}

export default NextofKinForm;