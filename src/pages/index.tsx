import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import { useDispatch } from 'react-redux'
import { withTranslation } from '../i18n'

const useStyles = makeStyles(() => ({
  logo: {
    width: '100%',
    height: 'auto'
  },
  getStarted: {
    marginRight: '12px'
  }
}))

function Home () {
  const classes = useStyles()

  return (
    <>
    <Box paddingTop='100px' paddingBottom='100px' paddingRight='24px' paddingLeft='24px' marginLeft='auto' marginRight='auto'>
      <Grid container spacing={3}>
        <Grid xs={12} md={5} item>
          <Typography variant='overline' color='secondary'>Introducing</Typography>
          <Typography component='h1' variant='h4' color='textPrimary'>Docudio Lab</Typography>
          <Box mt='24px'>
            <Typography variant='body1' color='textSecondary'>
              Docudio Lab is where we try things out, share what we tried with the world, and maybe use it on Docudio.
            </Typography>
          </Box>
          <Box mt='12px'>
            <Typography variant='body1' color='textSecondary'>
              Check out our blog, visit our github to see what we are doing, or visit our main Docudio site to get more info on what we do!
            </Typography>
          </Box>
          <Box mt='24px'>
            <Button
              className={classes.getStarted}
              variant='contained'
              color='primary'
              rel='noreferrer'
              target='_blank'
              href='/blog'
              startIcon={<PlayCircleFilledWhiteIcon />}
            >Checkout our Blog
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} md={7} item>
          <Box width='100%' height='100%' display='flex' alignContent='center' alignItems='center'>
            <img className={classes.logo} alt='ACAP' src='/lablogo.svg' />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}
Home.getInitialProps = async () => ({
  namespacesRequired: ['index']
})
export default withTranslation('index')(Home)
