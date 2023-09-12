import React, { useEffect } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

// ** Skeleton Css
import 'react-loading-skeleton/dist/skeleton.css'

// ** Toast container
import { toast, ToastContainer } from 'react-toastify';
import { AlertStore } from 'src/@core/store/alertSlice'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  const message = AlertStore((state)=>state.message)
  const messageStatus = AlertStore((state)=>state.messageStatus)
  const messageType = AlertStore((state)=>state.messageType)
  const setMessage = AlertStore((state)=> state.setMessage)
  const setStatus = AlertStore((state)=> state.setStatus)                      
  const setType = AlertStore((state)=> state.setType)



  useEffect(() => {
    if(messageStatus){
      toast( message, { type: messageType })
      setStatus(false);
    }
  }, [messageStatus, message,messageType,setStatus])

  return (

    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} `}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} `}
        />
        <meta name='keywords' content='' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  {getLayout(<Component {...pageProps} />)}
                  <ToastContainer/>
                </ThemeComponent>
              )
            }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
