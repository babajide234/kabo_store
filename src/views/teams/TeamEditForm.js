import { useState, useEffect } from 'react'

import { 
    TabContext,
    TabList,
    TabPanel,
} from "@mui/lab";

import { 
    Box,
    Card
} from "@mui/material";

import { useTeamSlice } from "src/@core/store/teamStore";
import { useUserStore } from "src/@core/store/userStore";

import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import StatusForm from '../forms/StatusForm';
import ProfileForm from '../forms/ProfileForm';
import AddressForm from '../forms/AddressForm';
import NextofKinForm from '../forms/NextofKinForm';
import AccountForm from '../forms/AccountForm';
import UploadForms from '../forms/UploadForms';


const Tab = styled(MuiTab)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      minWidth: 100
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 67
    }
  }))
  
  const TabName = styled('span')(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }))
  

function TeamEditForm({type}) {

    const [value, setValue] = useState('profile')
    
    const token = useUserStore( (state) => state.user )
    const { role } = useUserStore( (state) => state.details )
    
    const userId = useTeamSlice( (state) => state.userId )
    const editTeam = useTeamSlice( (state) => state.editTeam )
    const setSingleRider = useTeamSlice((state)=> state.setSingleRider)
    const setSingleTeams = useTeamSlice((state)=> state.setSingleTeams)
    const team = useTeamSlice((state)=> state.team)
    const rider = useTeamSlice((state)=> state.rider)

    const details = type == "rider" ? rider[0] : team[0] ; 
    
    console.log(details)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleSubmit = (values) =>{
        
        const data = {
            token,
            team_id: userId,
            active: values.active, 
            role: type 
        }

        editTeam(data)
    }

    useEffect(() => {
      
      if(type == 'rider'){
          const data ={
            token,
            email: userId,
            role:type,
            type: role.admin == "Yes" ? "Admin" : "SuperAdmin" 
          }
          setSingleRider(data);
      }

      if(type == 'admin'){
          const data ={
            token,
            email: userId,
            role: type,
            type: role.admin == "Yes" ? "Admin" : "SuperAdmin" 
          }
          setSingleTeams(data);
      }

  }, [token, setSingleRider, setSingleTeams, userId, type, role.admin])

    return (
      <Card>
        <TabContext value={value}>
            <TabList
                onChange={handleChange}
                aria-label='profile-settings tabs'
                sx={{ width:"100%", borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
             
                <Tab
                  value='profile'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TabName>profile</TabName>
                    </Box>
                  }
                />
              <Tab
                value='nextofkin'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TabName>Next of kin</TabName>
                  </Box>
                }
              />
               <Tab
                value='account'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TabName>Account Details</TabName>
                  </Box>
                }
              />
              <Tab
                value='status'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TabName>Status</TabName>
                  </Box>
                }
              />
              <Tab
                value='uploads'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TabName>File Uploads</TabName>
                  </Box>
                }
              />
            </TabList>
            <TabPanel sx={{ p: 0, width: "100%" }} value='profile'>
              <ProfileForm data={details}/>
            </TabPanel>
            <TabPanel sx={{ p: 0, width: "100%" }} value='nextofkin'>
              <NextofKinForm data={details?.next_of_kin}/>
            </TabPanel>
            <TabPanel sx={{ p: 0, width: "100%" }} value='account'>
              <AccountForm data={details?.bank_details}/>
            </TabPanel>
            <TabPanel sx={{ p: 0, width: "100%" }} value='status'>
              <StatusForm type={{
                role:details?.role,
                status:details?.active
                }}/>
            </TabPanel>
            <TabPanel sx={{ p: 0, width: "100%" }} value='uploads'>
              <UploadForms/>
            </TabPanel>
        </TabContext>
      </Card>
    );
}

export default TeamEditForm;