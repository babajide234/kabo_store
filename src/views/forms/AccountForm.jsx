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
import { useEffect } from "react";


const AccountForm = () => {

    const token = useUserStore( (state) => state.user )
    const loading = useTeamSlice( (state) => state.loading )
    const userId = useTeamSlice( (state) => state.userId )
    const setBanks = useTeamSlice( (state) => state.setBanks )
    const banks = useTeamSlice( (state) => state.banks )
    const updateBankAcc = useTeamSlice( (state) => state.updateBankAcc )
    const details = useUserStore( (state) => state.details )

    useEffect(()=>{
        if(!banks){
            setBanks()
        }

    },[banks,setBanks])

    const initialValues = {
        bank_code: '',
        account_no: ''
      };

    const handleSubmit = (values) => {
        updateBankAcc({
            token,
            management: 'Yes',
            account_id:userId,
            store_id: details.store_id.admin ? details.store_id.admin : '',
            email: userId,
            bank_code: values.bank_code,
            account_no: values.account_no 
        })
    };

    return (
        <CardContent>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Bank</InputLabel>
                                <Field
                                    name="bank_code"
                                    as={Select}
                                    label="Bank"
                                >
                                    {
                                        banks?.map(item=>(
                                            <MenuItem key={item.bank_code} value={item.bank_code}>{item.bank_name}</MenuItem>
                                        ))
                                    }
                                </Field>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <Field
                                name="account_no"
                                as={TextField}
                                fullWidth
                                label="Account Number"
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float:"right"}}>
                                Update Bank Details
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
        </CardContent>
    );
}

export default AccountForm;