// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { CheckCircleOutline } from '@mui/icons-material';

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import { useUserStore } from 'src/@core/store/userStore'
import { LoadingButton } from '@mui/lab'
import { useStoreSlice } from 'src/@core/store/storeSlice'
import { useRouter } from 'next/router';

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  
  const isLoading = useUserStore((state)=>state.loading)
  const storeId = useStoreSlice((state)=>state.storeId)
  const registerStore = useStoreSlice((state)=>state.registerStore)
  const regLoading = useStoreSlice((state)=>state.loading)
  const setStoreId = useStoreSlice((state)=>state.setStoreId)

  const router = useRouter();

  // ** States
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    personal: {
      lastname: "",
      othernames: "",
      username: "",
      email: "",
      phone: "",
      passcode: ""
    }
  };

  const initialStoreValues = {
    name: "",
    phone: "",
    email: ""
}

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    passcode: Yup.string().required('Password is required').max(10, 'Password must be at most 10 characters'),
    agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
  });

  const validationStoreSchema = Yup.object({
    name: Yup.string().required('Store Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
  });
  
  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }



  const createStoreSubmit = (values) => {
    // Handle form submission
    console.log(values);

    const data = {
        name: values.name,
        phone: values.personal.phone,
        email: values.email,
        personal: {
          lastname: values.personal.lastname,
          othernames: values.personal.othernames,
          username: values.personal.username,
          email: values.personal.email,
          phone: values.personal.phone,
          passcode: values.personal.passcode
        },
    };

    console.log(data)

    registerStore(data);
  };

  const handleNav = () => {
    console.log("navigate")
    setStoreId(null);
    router.push('/pages/login');
  }
  

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, width:800 }}>
        {
          storeId !== null ? (
            <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
                <CheckCircleOutline sx={{ fontSize: 64, color: 'success.main' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign:"center" }}>
                Registration Successful!
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary',textAlign:"center", mb: 10 }}>
                Thank you for registering your store.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" onClick={handleNav} >
                    Go to Login
                  </Button>
              </Box>
            </CardContent>
          ):(
            <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
                <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography
                    variant='h6'
                    sx={{
                      ml: 3,
                      lineHeight: 1,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontSize: '1.5rem !important'
                    }}
                  >
                    {themeConfig.templateName} Registration
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                    Store Information
                  </Typography>
                </Box>
 

                <Formik 
                  initialValues={initialValues} 
                  onSubmit={createStoreSubmit}
                >
                  {({ values, handleChange,isValid  }) => (
                    <Form>
                       <TextField 
                        autoFocus 
                        fullWidth 
                        id='name' 
                        label='Store Name' 
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        sx={{ marginBottom: 4 }}
                      />  
                        <TextField 
                          fullWidth 
                          type='email' 
                          label='Email'
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          sx={{ marginBottom: 4 }} 
                        />
                        <TextField 
                          fullWidth 
                          type='text' 
                          label='Phone'
                          name="phone"
                          onChange={handleChange}
                          value={values.phone}
                          sx={{ marginBottom: 4 }} 
                        />
               <Box sx={{ mb: 6 }}>
                  <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                    User Information
                  </Typography>
                </Box>
               <Box sx={{ mb: 6, display:'flex', gap: 5 }}>
                  <Box>
                      <TextField 
                        fullWidth 
                        type='text' 
                        label='First Name'
                        name="personal.othernames"
                        onChange={handleChange}
                        value={values.personal.othernames}
                        sx={{ marginBottom: 4 }} 
                      />
                  </Box>
                  <Box>
                      <TextField 
                        fullWidth 
                        type='text' 
                        label='Last Name'
                        name="personal.lastname"
                        onChange={handleChange}
                        value={values.personal.lastname}
                        sx={{ marginBottom: 4 }} 
                      />
                  </Box>
                </Box>
                     
                      <TextField 
                        autoFocus 
                        fullWidth 
                        id='username' 
                        label='Username' 
                        name="personal.username"
                        onChange={handleChange}
                        value={values.personal.username}
                        sx={{ marginBottom: 4 }}
                      />
                      <TextField 
                        fullWidth 
                        type='email' 
                        label='Email'
                        name="personal.email"
                        onChange={handleChange}
                        value={values.personal.email}
                        sx={{ marginBottom: 4 }} 
                      />
                      <TextField 
                        fullWidth 
                        type='text' 
                        label='Phone'
                        name="personal.phone"
                        onChange={handleChange}
                        value={values.personal.phone}
                        sx={{ marginBottom: 4 }} 
                      />
                      <FormControl fullWidth>
                        <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
                        <OutlinedInput
                          label='Password'
                          id='auth-register-password'
                          name="personal.passcode"
                          value={values.personal.passcode}
                          onChange={handleChange}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                aria-label='toggle password visibility'
                              >
                                {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>

                      <FormControlLabel
                        control={<Checkbox />}
                        name='agreeToTerms'
                        value= {values.agreeToTerms}
                        onChange={handleChange}
                        label={
                          <Fragment>
                            <span>I agree to </span>
                            <Link href='/' passHref>
                              <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
                            </Link>
                          </Fragment>
                        }
                      />

                      <LoadingButton 
                        fullWidth 
                        size='large' 
                        type='submit' 
                        variant='contained'
                        disabled={!isValid}
                        loading={regLoading}
                        sx={{ marginBottom: 7 }}
                      >
                        Sign up
                      </LoadingButton>

                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Typography variant='body2' sx={{ marginRight: 2 }}>
                          Already have an account?
                        </Typography>
                        <Typography variant='body2'>
                          <Link passHref href='/pages/login'>
                            <LinkStyled>Sign in instead</LinkStyled>
                          </Link>
                        </Typography>
                      </Box>
                    
                    </Form>
                  )}
                </Formik>

            </CardContent>
          )
        }
      </Card>
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
