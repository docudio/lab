import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'
import App from 'next/app'
import React, { useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import { Translation } from 'react-i18next'
import { useRouter } from 'next/router'
// import apm from '../utils/rum'
import { i18n, appWithTranslation } from '../i18n'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, IconButton, CssBaseline,useTheme,useMediaQuery, Button, Avatar } from '@material-ui/core'
import { loadApp } from '../actions'

function WrappedApp(props) {

  const { Component, pageProps } = props
  const router = useRouter()



  return (
    <Provider store={store}>
<RootPage {...props} />
</Provider>
      
  )
}

function RootPage(props) {

  const { Component, pageProps } = props


  const dispatch = useDispatch()
  const appLoaded = true
  const router = useRouter()
  useEffect(() => {
    if (!appLoaded) {
      dispatch(loadApp())
    }
    if (i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale)
    }
  }, [dispatch, appLoaded, router])


  const ThemePreference = useSelector(state => state.theme.preferred)
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: ThemePreference === true ? 'dark' : 'light',
          primary: { main: '#000000' },
          secondary: { main: '#dbdbdb' }
        },
        typography: { fontFamily: ['Montserrat'].join(',') }

      }),
    [ThemePreference]
  )
  const themeHook = useTheme();

  const matches = useMediaQuery(themeHook.breakpoints.up('sm'));

  const notistackRef = React.createRef()
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <Provider store={store}>
            <ThemeProvider theme={theme}>
        <SnackbarProvider ref={notistackRef} action={(key) => (
          <Button onClick={onClickDismiss(key)}>
            <Translation ns='_app'>
              {
                (t, { i18n }) => <p>{t('Dismiss')}</p>
              }
            </Translation>
          </Button>
        )}
        maxSnack={3} >

      <Component {...pageProps} />
      </SnackbarProvider >

</ThemeProvider>
</Provider>
      
  )
}
WrappedApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps, namespacesRequired: ['_app'] }
}


export default WrappedApp
