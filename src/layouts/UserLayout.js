import { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import { SuperNavigation, AdminNavigation} from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import AuthContent from 'src/@core/components/AuthContent'

import { useUserStore } from 'src/@core/store/userStore'

// ** Toast container
import { ToastContainer } from 'react-toastify';

const UserLayout = ({ children }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const details = useUserStore((state)=> state.details )
  
  const { role } = details;

  const getRole= ()=>{

    if(role?.superAdmin === "Yes"){
      return SuperNavigation() 
    }
    
    if(role?.admin === "Yes"){
      return AdminNavigation() 
    }

  }

  console.log(details)

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={
        getRole()
      } // Navigation Items
      afterVerticalNavMenuContent
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      <AuthContent>
        {children}
      </AuthContent>

    </VerticalLayout>
  )
}

export default UserLayout
