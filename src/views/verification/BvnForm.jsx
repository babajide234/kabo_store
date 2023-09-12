import { Form, Formik } from 'formik'
import { VerifyStore } from 'src/@core/store/verifyStore'
import { useUserStore } from 'src/@core/store/userStore'
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material/'
import { LoadingButton } from '@mui/lab'
import { useEffect } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const BvnForm = ({ kyc }) => {
  const getCheck = VerifyStore(state => state.getCheck)
  const verifycheck = VerifyStore(state => state.verifycheck)
  const loading = VerifyStore(state => state.loading)
  const kyc_id = VerifyStore(state => state.kyc_id)
  const resendOtp = VerifyStore(state => state.resenOtp)
  const token = useUserStore(state => state.user)
  const verifydetails = useUserStore(state => state.verifydetails)
  const { store_id, verification } = verifydetails

  const initialValues = {
    bvn: '',
    phone: ''
  }

  const codeinitialValues = {
    code: ''
  }
  const { data: otp, error: otpError, mutate } = useSWR('/api/verifycheck')

  // const { trigger, isMutating } = useSWRMutation('/api/user', resendOtp)

  useEffect(() => {
    console.log('verify', verifydetails)
  }, [])

  const handleSubmit = values => {
    const data = {
      token: token,
      store_id: store_id,
      kyc_id: kyc_id,
      number: '',
      type: kyc.kyc_type,
      doc_url: '',
      phone_number: values.phone,
      bvn: values.bvn,
      photo_url: '',
      otp: '',
      send_otp: ''
    }

    getCheck(data)
  }

  // GIBBIG: TO REQUEST CUSTOMER BVN PHONE NUMBER VERIFICATION
  // {
  //     "token": "NGEwYTVmMTBiOTliZTYyOTI4MDM3YWY5MDM5MTUyOTM=",
  //     "store_id": "2032",
  //     "kyc_id": "6",
  //     "send_otp": "Yes"
  // }

  // GIBBIG: TO VERIFY CUSTOMER BVN PHONE NUMBER
  // {
  //     "token": "NGEwYTVmMTBiOTliZTYyOTI4MDM3YWY5MDM5MTUyOTM=",
  //     "store_id": "2032",
  //     "kyc_id": "6",
  //     "otp": "ENTER OTP SENT HERE"
  // }

  const resendOtpSubmit = async () => {
    const data = {
      token,
      store_id: store_id,
      kyc_id: kyc_id,
      send_otp: 'Yes'
    }

    await resendOtp(data)
  }

  const verifyOtp = () => {}

  return (
    <>
      {verifycheck ? (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form>
              <Grid container spacing={7}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    type={'number'}
                    label=''
                    name='bvn'
                    placeholder='Bank Verification Number...'
                    value={values.bvn}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    type={'text'}
                    label=''
                    name='phone'
                    placeholder='Bvn Phone number'
                    value={values.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float: 'right' }}>
                    Verify Bvn
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <Formik initialValues={codeinitialValues} onSubmit={verifyOtp}>
            {({ values, handleChange }) => (
              <Form>
                <Grid container spacing={7}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type={'number'}
                      label=''
                      name='code'
                      placeholder='Input verification code sent to BVN phone number'
                      value={values.code}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button type='button' onClick={resendOtpSubmit}>
                      Resend OTP
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <LoadingButton loading={loading} variant='contained' type='submit' sx={{ float: 'right' }}>
                      Verify Code
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  )
}

export default BvnForm
