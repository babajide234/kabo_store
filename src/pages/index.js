import React, { useEffect, useState } from 'react'

import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Modal,
  Box
} from '@mui/material/'
import { Store, People, ShoppingCart, Person, LocalOffer } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'

import { useUserStore } from 'src/@core/store/userStore'

import Link from 'next/link'

import useSWR from 'swr'
import Skeleton from 'react-loading-skeleton'

import { makeStyles } from '@mui/styles'
import VerifyCheck from 'src/views/verification/VerifyCheck'
import { VerifyStore } from '../@core/store/verifyStore'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    textAlign: 'center',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    margin: '16px'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: '16px',
    marginBottom: '32px'
  },
  info: {
    fontSize: 16,
    marginBottom: '8px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '8px',
    minWidth: '500px',
    padding: '50px 70px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  cancelIcon: {
    color: 'red'
  }
}))

const Dashboard = () => {
  const metrics = useUserStore(state => state.metrics)
  const token = useUserStore(state => state.user)

  const details = useUserStore(state => state.details)
  const getMetrics = useUserStore(state => state.getMetrics)
  const verifydetails = useUserStore(state => state.verifydetails)
  const getVerifiables = useUserStore(state => state.getVerifiables)
  const trackverification = useUserStore(state => state.trackverification)
  const setKycId = VerifyStore(state => state.setKycId)

  const [verifyModal, setVerifyModal] = useState(false)
  const [kycTypes, setKycTypes] = useState([])
  const [bvnStatus, setBvnStatus] = useState(false)

  const storeId = details?.role.superAdmin == 'Yes' ? details?.store_id.superAdmin : details?.store_id.admin

  useEffect(() => {
    getVerifiables({
      token,
      store_id: details?.role.superAdmin == 'Yes' ? details?.store_id.superAdmin : details?.store_id.admin
    })
  }, [])

  useEffect(() => {
    console.log(verifydetails)
  }, [verifydetails])

  const { verification } = verifydetails ?? {}

  const { list } = verification ?? {}
  const status = list

  useEffect(() => {
    if (list && typeof list === 'object') {
      const filteredTypes = []

      Object.values(list).forEach(item => {
        if (Array.isArray(item)) {
          item.forEach(val => {
            if (val.status === 'Pending') {
              filteredTypes.push(val)
            }
            console.log('value', val)
          })
        } else if (typeof item === 'object') {
          // console.log('object', item)
          if (item.status === 'Pending') {
            filteredTypes.push(item)
          } else {
            if (item.kyc_type === 'BVN' && item.status !== 'Pending') {
              setBvnStatus(true)
            } else {
              setBvnStatus(false)
            }
          }
        }
      })

      setKycTypes(filteredTypes)
    }
  }, [list])

  const { data, error, isLoading } = useSWR('/api/metrics', getMetrics)

  const customer = useSWR('/api/bvn', () =>
    trackverification({
      token,
      account: 'customer'
    })
  )

  const track = useSWR(bvnStatus ? '/api/track' : null, () =>
    trackverification({
      token,
      account: 'store'
    })
  )

  // const isSuperAdmin = details ? details.role.superAdmin == "Yes" ? true : false : false ;
  // useEffect(() => {
  //   console.log(track.data)
  // }, [track])

  const classes = useStyles()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 600,
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '10px',
    paddingBlock: 20,
    paddingInline: 20
  }

  const handleVerify = id => {
    console.log(id)
    setKycId(id)
    setVerifyModal(!verifyModal)
  }

  return (
    <div style={{ padding: 16 }}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>

      {!customer.isLoading && (
        <Grid item xs={12} md={4} sx={{ marginBottom: '30px' }}>
          <Paper style={{ padding: 16 }}>
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <Typography variant='h5'> Verification Requirements</Typography>
              </Grid>
              <Grid item xs>
                {customer.data.map((type, index) => {
                  if (type.code === 'bvn') {
                  }
                  console.log('type', type)

                  return (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CancelIcon className={classes.cancelIcon} />
                      </ListItemIcon>
                      <ListItemText primary={type.type} />
                      <Button variant='outlined' size='small' onClick={() => handleVerify(type.kyc_id)}>
                        Verify
                      </Button>
                    </ListItem>
                  )
                })}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}

      {!track.isLoading && track.data && bvnStatus && (
        <Grid item xs={12} md={4} sx={{ marginBottom: '30px' }}>
          <Paper style={{ padding: 16 }}>
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <Typography variant='h5'>User Verification Requirements</Typography>
              </Grid>
              <Grid item xs>
                {track.data.map((type, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CancelIcon className={classes.cancelIcon} />
                    </ListItemIcon>
                    <ListItemText primary={type.type} />
                    <Button variant='outlined' size='small' onClick={() => handleVerify(type.kyc_id)}>
                      Verify
                    </Button>
                  </ListItem>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}

      {/* {verification?.expectedCount !== verification?.totalCount && (
        <Grid item xs={12} md={4} sx={{ marginBottom: '30px' }}>
          <Paper style={{ padding: 16 }}>
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <Typography variant='h5'>Verification Requirements</Typography>
              </Grid>
              <Grid item xs>
                {kycTypes.map((kycType, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CancelIcon className={classes.cancelIcon} />
                    </ListItemIcon>
                    <ListItemText primary={kycType.kyc_type} />
                    <Button variant='outlined' size='small' onClick={() => handleVerify(kycType.kyc_id)}>
                      Verify
                    </Button>
                  </ListItem>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )} */}

      <Grid item xs={12} md={4} sx={{ marginBottom: '30px' }}>
        <Paper style={{ padding: 16 }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              {!details?.photo && <Avatar src='./images/logo.png' />}
              {details?.photo && <Avatar src={details?.photo} />}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>{details && details.username}</Typography>
              <Typography variant='subtitle1'>{details && details.email}</Typography>
              <Typography variant='subtitle2'>
                {details && details.role.superAdmin == 'Yes' ? 'Super Admin' : 'Admin'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid container spacing={3} mb={10}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Grid container alignItems='center'>
              <Grid item mr={5}>
                <ShoppingCart />
              </Grid>

              <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' gutterBottom>
                  Delivered Orders
                </Typography>
                <Grid item xs sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h4'>{metrics && metrics.delivered_orders}</Typography>

                  <Link href='/order' style={{ textDecoration: 'none' }} passHref>
                    <Button variant='outlined' size='small'>
                      View
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Skeleton />
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems='center'>
              <Grid item mr={5}>
                <ShoppingCart />
              </Grid>
              <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' gutterBottom>
                  Failed Orders
                </Typography>
                <Grid item xs sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h4'>{metrics && metrics.failed_orders}</Typography>
                  <Link href='/order' style={{ textDecoration: 'none' }} passHref>
                    <Button variant='outlined' size='small'>
                      View
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems='center'>
              <Grid item mr={5}>
                <ShoppingCart />
              </Grid>
              <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' gutterBottom>
                  Successful Orders
                </Typography>
                <Grid item xs sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h4'>{metrics && metrics.successful_orders}</Typography>
                  <Link href='/order' style={{ textDecoration: 'none' }} passHref>
                    <Button variant='outlined' size='small'>
                      View
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems='center'>
              <Grid item mr={5}>
                <LocalOffer />
              </Grid>
              <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' gutterBottom>
                  Active Products
                </Typography>
                <Grid item xs sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h4'>{metrics && metrics.total_active_products}</Typography>
                  <Link href='/products' style={{ textDecoration: 'none' }} passHref>
                    <Button variant='outlined' size='small'>
                      View
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Modal open={verifyModal} onClose={() => setVerifyModal(!verifyModal)}>
        <Box sx={style}>
          <VerifyCheck />
        </Box>
      </Modal>
    </div>
  )
}

export default Dashboard
