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

const RecoverPage = () => {

    const recoverAccount = useUserStore((state)=> state.recoverAccount)
    const loading = useUserStore((state)=> state.loading)
    const passwordReset = useUserStore((state)=> state.passwordReset)
  
    const setMessage = AlertStore((state)=> state.setMessage)
    const setStatus = AlertStore((state)=> state.setStatus)                      
    const setType = AlertStore((state)=> state.setType)
    
    
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

        recoverAccount({
            email: values.email
        });
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
                        {
                            passwordReset && (
                                <Box sx={{ mb: 6, mt:20, textAlign:"center" }}>
                                    <Typography variant='body2'>New password sent to your email</Typography>
                                    <Link href='/pages/login' passHref >
                                        <LinkStyled>Back To login</LinkStyled>
                                    </Link>
                                </Box>
                            )
                        }
                        {
                            !passwordReset && (
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
                                <Button
                                    fullWidth
                                    size='large'
                                    variant='contained'
                                    sx={{ marginBottom: 7 }}
                                    type="submit"
                                >
                                { loading ?  <CircularProgress color="inherit"/> : 'Recover Account' }
                                </Button>
                                <Box sx={{ my: 6, textAlign:'right' }}>

                                    <Link href='/pages/login' passHref >
                                        <LinkStyled>Back To login</LinkStyled>
                                    </Link>
                                </Box>
                                
                            </form>
                            )
                        }

                       
                    </CardContent>
                </Card>
                <FooterIllustrationsV1 />
            </Box>
        </UnAuthContent>
    );
}

RecoverPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RecoverPage;