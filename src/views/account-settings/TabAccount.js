// ** React Imports
import React, { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { Formik } from 'formik'
import { useUserStore } from 'src/@core/store/userStore'
import { LoadingButton } from '@mui/lab'
import {  LinearProgress } from "@mui/material";
import { uploadStore } from 'src/@core/store/uploadSlice';
import { instance } from 'src/@core/hooks/service'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))



function TabAccount () {
  // ** State

  const token = useUserStore(state => state.user);
  const details = useUserStore(state => state.details);
  const loading = useUserStore(state => state.loading);
  const uploadPic = useUserStore(state => state.uploadPic);
  const updateProfile = useUserStore(state => state.updateProfile);
  
  const file_url = uploadStore(state => state.file_url)
  const setFileUrl = uploadStore(state => state.setFileUrl)


  const [currentFile, setCurrentFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);


  const [openAlert, setOpenAlert] = useState(false)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }
  
  const initialValues = {
    username: details ? details.username :"",
    lastname: details ? details.lastname :"",
    firstname: details ? details.othernames :"",
    email: details ? details.email :"",
    phone: details ? details.phone :"",
  };


  const handleFileSelect = (event) => {
    setCurrentFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    
    const formData = new FormData();

    formData.append('token', token);
    formData.append('file', currentFile);


    try {
      const response = await instance.post('misc/file-upload', formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
          },
      });
      
      console.log(response);

      if(response.data.status == "success"){
          setFileUrl(response.data.file_url)
          setUploadStatus('success');
          
        //   const data = {
        //     token,
        //     management: "",
        //     email: details.email,
        //     file_url: response.data.file_url
        // }
        // uploadPic(data);

      }else{
          setUploadStatus('failed');
      }

      // Do something with the response data if needed

    } catch (error) {
      console.error(error);
      setUploadStatus('failed');

      // Handle error if needed
    }
  };

  const handleSubmit =(values)=>{
    const data ={
      token,
      username: values.username,
      lastname: values.lastname,
      othernames: values.firstname,
      email: values.email,
      phone: values.phone
      }
    updateProfile(data)
  }

  return (
    <CardContent>
      <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ButtonStyled component='label' htmlFor='account-settings-upload-image'>

                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                      <input
                          hidden
                          type='file'
                          onChange={handleFileSelect}
                          accept='image/png, image/jpeg'
                          id='account-settings-upload-image'
                        />
                  </ButtonStyled>
                  <Box>
                    <ButtonStyled 
                      variant='contained' 
                      onClick={handleUpload}
                      disabled={!currentFile}
                    >
                      Upload New Photo
                      { loading && (
                        <Box mt={4} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                          </Box>
                        </Box>
                      )}
                    </ButtonStyled>
                    <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                      Reset
                    </ResetButtonStyled>
                    <Typography variant='body2' sx={{ marginTop: 5 }}>
                      Allowed PNG or JPEG. Max size of 800K.
                    </Typography>
                  </Box>
          </Box> 
      </Grid>
      <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
      {({values, handleSubmit,handleChange}) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={7}>

              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  label='Username' 
                  name='username'
                  placeholder='johnDoe'
                  value={values.username}
                  onChange={handleChange}

                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'                  
                  name='email'
                  value={values.email}
                  onChange={handleChange}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  label='FirstName' 
                  name='firstname'
                  placeholder='First Name'
                  value={values.firstname}
                  onChange={handleChange}

                 />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  label='LastName' 
                  name='lastname'
                  placeholder='Last Name'
                  value={values.lastname}
                  onChange={handleChange}

                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  label='Phone' 
                  name='phone'
                  placeholder='Phone Number' 
                  value={values.phone}
                  onChange={handleChange}

                />
              </Grid>

              {openAlert ? (
                <Grid item xs={12} sx={{ mb: 3 }}>
                  <Alert
                    severity='warning'
                    sx={{ '& a': { fontWeight: 400 } }}
                    action={
                      <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                        <Close fontSize='inherit' />
                      </IconButton>
                    }
                  >
                    <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                    <Link href='/' onClick={e => e.preventDefault()}>
                      Resend Confirmation
                    </Link>
                  </Alert>
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <LoadingButton loading={loading} type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
                  Save Changes
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
      )}
      </Formik>
    </CardContent>
  )
}

export default TabAccount
