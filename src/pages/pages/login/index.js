// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import AuthLayouts from 'src/layouts/AuthLayouts'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import UnAuthContent from 'src/@core/components/UnAuthContent'

import {useUserStore} from 'src/@core/store/userStore'
import { ToastContainer, toast } from 'react-toastify'
import { useBoundStore } from 'src/@core/store/useBoundStore'
import { AlertStore } from 'src/@core/store/alertSlice'

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
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const login = useUserStore((state)=> state.login)
  const loading = useUserStore((state)=> state.loading)
  const setPwdStatus = useUserStore((state)=> state.setPwdStatus)
  const passwordReset = useUserStore((state)=> state.passwordReset)

  const setMessage = AlertStore((state)=> state.setMessage)
  const setStatus = AlertStore((state)=> state.setStatus)                      
  const setType = AlertStore((state)=> state.setType)
  
  
  useEffect(()=>{
    if(passwordReset){
      setPwdStatus()
    }
  },[passwordReset,setPwdStatus])

  // ** State
  const [values, setValues] = useState({
    email:'',
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = (e)=>{
      e.preventDefault();
      console.log("details",values);
      login(values.email,values.password);
  }

  const onClick = () => {
    setMessage('message2');
    setStatus(true);
    setType('error');
  }

  return (
    <UnAuthContent>
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 6,display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
              <img src="/images/logo.png" alt="" className='' style={{
                width:'30%'
              }}/>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Welcome to {themeConfig.templateName}!
              </Typography>
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField 
                autoFocus 
                fullWidth 
                id='email' 
                label='Email'
                type={'email'}
                sx={{ marginBottom: 4 }} 
                value={values.email}
                onChange={handleChange('email')}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box 
                sx={{ 
                  mb: 4, 
                  display: 'flex', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  justifyContent: 'space-between' 
                }}
              >
                <FormControlLabel control={<Checkbox />} label='Remember Me' />
                <Link href='/pages/recover' passHref >
                  <LinkStyled>Forgot Password?</LinkStyled>
                </Link>
              </Box>

              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                type="submit"
              >
                { loading ?  <CircularProgress color="inherit"/> : 'Login' }
              </Button>
              
            </form>
            <Link href='/pages/register' passHref >
              {/* <LinkStyled>Register</LinkStyled> */}
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                type="submit"
              >
                Register
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </UnAuthContent>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>


export default LoginPage
