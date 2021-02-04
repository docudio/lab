import React, { useEffect } from 'react'
import Link from 'next/link'
import { SnackbarProvider } from 'notistack'
import Footer from '../sharedComponents/footer'
import '../utils/index.css'
import Hidden from '@material-ui/core/Hidden'
import Notifier from '../utils/Notifier'
import Container from '@material-ui/core/Container'
import withWidth from '@material-ui/core/withWidth'
import { Translation } from 'react-i18next'
import { useRouter } from 'next/router'
// import apm from '../utils/rum'
import '../utils/App.css'
import { i18n, appWithTranslation } from '../i18n'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch, Provider } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import store from '../store'
import type { DefaultRootState } from "../store";
import { Grid, IconButton, CssBaseline, Button, Avatar, useTheme, useMediaQuery } from '@material-ui/core'
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import App from 'next/app'
import PageLinks from '../utils/pageLinks'
import { loadApp } from '../actions'
import DarkModeToggle from '../utils/DarkModeToggle'

function WrappedApp (props) {
  return (
    <Provider store={store}>
      <RootPage {...props} />
    </Provider>

  )
}

function RootPage (props) {
  const { Component, pageProps, width } = props
  const [open, setOpen] = React.useState(!(width === 'xs' || width === 'sm'))
  const drawerWidth = React.useMemo(
    () =>
      open ? (width == 'xs' || width == 'sm') ? 120: 240 : 0,
    [open]
  )

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex'
    },
    avatarImg: {
      color: 'transparent',
      width: '100%',
      height: '100%',
      'object-fit': 'cover',
      'text-align': 'center',
      'text-indent': '10000px'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
    // width: drawerWidth
    },
    content: {
      flexGrow: 1,
      width: '100%'
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '90vh'
    },
    copyright: {
      marginTop: 'auto',
      paddingBottom: '20px'
    },
    title: {
      flexGrow: 1
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7)
    },

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
  }))
  const shouldCollapse = React.useMemo(
    () => (width === 'xs' || width === 'sm')
    ,
    [width]
  )

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setOpen(!shouldCollapse)
  }, [shouldCollapse])

  const classes = useStyles()
  const handleDrawerOpen = () => {
    if (open === true) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

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

  const ThemePreference = useSelector((state: DefaultRootState) => state.theme.preferred)
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: ThemePreference === true ? 'dark' : 'light',
          primary: { main: '#000000' },
          secondary: { main: '#aa1111' }
        },
        typography: { fontFamily: ['Montserrat'].join(',') }

      }),
    [ThemePreference]
  )
  const themeHook = useTheme()

  const matches = useMediaQuery(themeHook.breakpoints.up('sm'))

  const notistackRef: any = React.createRef()
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          ref={notistackRef} action={(key) => (
            <Button onClick={onClickDismiss(key)}>
              <Translation ns='_app'>
                {
                  (t, { i18n }) => <p>{t('Dismiss')}</p>
                }
              </Translation>
            </Button>
          )}
          maxSnack={3}
        >

          <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={classes.appBar}>
              <Toolbar>

                <Grid
                  container direction='row'
                  spacing={4}
                >
                  <Grid item xl={2} xs={4} sm={2} md={2} lg={2}>
                    <IconButton
                      color='inherit'
                      aria-label='open drawer'
                      onClick={handleDrawerOpen}
                      edge='start'
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                  <Hidden smDown>

                    <Grid item xl={6} xs={7} sm={6} md={6} lg={6}>

                      <Button
                        size='large' className={classes.large} startIcon={
                          <Link
                            href='/'
                          >

                            <Avatar className={classes.large} src='/logo2.png' />

                          </Link>
                      } variant='contained' color='primary'
                      >

                        <Link
                          
                          href='/'

                        >
                          <Typography variant='h5'> Docudio Lab</Typography>
                        </Link>
                      </Button>         {/*  <LegacysiteLink /><LoginButton /> */}

                    </Grid>
                  </Hidden>

                  <Hidden mdUp>

                    <Grid item xl={6} xs={7} sm={6} md={6} lg={6}>
            <Link
                        href='/'

                      >
                        <Typography variant='h5'> Docudio Lab</Typography>
                      </Link>
          </Grid>
                  </Hidden>

                  <Hidden xsDown>

                    <Grid item xl={4} xs={false} sm={2} md={2} lg={4}>
            <DarkModeToggle />
          </Grid>
                  </Hidden>

                </Grid>

              </Toolbar>
            </AppBar>

            <Drawer
              variant='persistent'
              open={open}
            >
              <div className={classes.toolbar} />
              <div >
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <PageLinks handleDrawerClose={width === 'xs' || width === 'sm' ? handleDrawerClose : undefined} />
              <Divider />
            </Drawer>

            <main className={classes.content}>
              <Container fixed>

                <Component {...pageProps} />
                <Notifier />

                <Footer />

              </Container>

            </main>

          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>

  )
}
WrappedApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps, namespacesRequired: ['_app'] }
}

export default withWidth()(appWithTranslation(WrappedApp))
