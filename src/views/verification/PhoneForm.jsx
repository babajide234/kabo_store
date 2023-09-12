import { Form, Formik } from 'formik'
import { VerifyStore } from 'src/@core/store/verifyStore'
import { useUserStore } from 'src/@core/store/userStore'
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material/'
import { LoadingButton } from '@mui/lab'

export default PhoneForm = () => {
  const getCheck = VerifyStore(state => state.getCheck)

  const initialValues = {
    bvn: ''
  }

  const handleSubmit = () => {
    const data = {
      token: token,
      store_id: '',
      kyc_id: '',
      number: '',
      type: '',
      doc_url: '',
      phone_number: '',
      bvn: '',
      photo_url: '',
      otp: '',
      send_otp: ''
    }

    getCheck(data)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type={'text'}
              label=''
              name='value'
              placeholder=''
              value={values.bvn}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float: 'right' }}>
              Verify Bvn
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </Formik>
  )
}
