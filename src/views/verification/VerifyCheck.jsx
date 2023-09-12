import { useEffect, useState } from 'react'
import { useUserStore } from 'src/@core/store/userStore'
import { VerifyStore } from 'src/@core/store/verifyStore'
import { Form, Formik } from 'formik'

import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material/'

import { LoadingButton } from '@mui/lab'
import UploadForms from '../forms/UploadForms'
import BvnForm from './BvnForm'

const VerifyCheck = () => {
  const [kycTypes, setKycTypes] = useState({})
  const [cac, setCac] = useState('')
  const [value, setValue] = useState('')

  const id = VerifyStore(state => state.storeId)
  const getCheck = VerifyStore(state => state.getCheck)
  const kyc_id = VerifyStore(state => state.kyc_id)
  const loading = VerifyStore(state => state.loading)
  const token = useUserStore(state => state.user)
  const verifydetails = useUserStore(state => state.verifydetails)
  const { store_id, verification } = verifydetails

  const { list } = verification

  useEffect(() => {
    if (list && typeof list === 'object') {
      const filteredTypes = []

      Object.values(list).forEach(item => {
        if (Array.isArray(item)) {
          item.forEach(val => {
            if (val.status === 'Pending') {
              filteredTypes.push(val)
            }
          })
        } else if (typeof item === 'object') {
          if (item.status === 'Pending') {
            filteredTypes.push(item)
          }
        }
      })

      const selected = filteredTypes.filter(item => item.kyc_id == kyc_id)[0]
      console.log('selected kyc', selected)
      setKycTypes(selected)
    }
  }, [list, kyc_id])

  useEffect(() => {
    console.log('kycTypes', kycTypes)
  }, [kycTypes])

  const handleSubmit = () => {
    const data = {
      token: token,
      store_id: store_id,
      kyc_id: kycTypes?.kyc_id,
      number: '',
      type: kycTypes?.kyc_type,
      doc_url: kycTypes?.kyc_type == 'Documents (CAC Certificate, Application form, Memart)' ? '' : '',
      phone_number: kycTypes?.kyc_type == 'Director Phone Number Confirmation' ? '' : '',
      bvn: kycTypes?.kyc_type == 'BVN' ? '' : '',
      photo_url: '',
      otp: '',
      send_otp: ''
    }

    getCheck(data)
  }

  const handleCac = e => {
    e.preventDefault()

    const data = {
      token,
      store_id: store_id,
      kyc_id: kycTypes?.kyc_id,
      number: value,
      type: cac, // BN or RC
      doc_url: '', //pdf that includes application form, certificate & memart
      phone_number: '', //phone number must match phone number on bvn record
      bvn: '',
      dob: '',
      photo_url: '',
      otp: '', //needed when validating bvnPhoneNumber or directorPhoneNumber
      send_otp: '' //Yes or No
    }

    getCheck(data)
  }

  return (
    <>
      {<BvnForm kyc={kycTypes} />}
      {kycTypes && kycTypes.kyc_type == 'Phone Number Confirmation' && <BvnForm kyc={kycTypes} />}
    </>
  )
}

export default VerifyCheck
