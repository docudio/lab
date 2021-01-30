import { Paper, Box, Typography, Grid, Button } from '@material-ui/core'
import React from 'react'
import FeatureSnippet from '../../utils/FeatureSnippet'
import { AssessmentOutlined, PlayCircleFilledOutlined } from '@material-ui/icons'

export default function Features () {
  return (
    <Paper elevation={0} square>
      <Box pt={14} pb={14} pl={6} pr={6}>
        <Typography align='center' variant='overline' component='h4' color='secondary'>
          Explore ACAP
        </Typography>
        <Typography align='center' variant='h4' component='h3'>
          Certificate Automation - Finally
        </Typography>
        <Box pt={5}>
          <Grid container spacing={4}>
            <FeatureSnippet
              icon={<PlayCircleFilledOutlined />}
              half
              title='ACAP Onboarding'
              text='Are the Servers you manage in CyberArk? Are you a member of the LDAP Groups which have access to these servers (More on this in our FAQ for Onboarding)? If so, enjoy automated onboarding to ACAP by requesting installation of the ACME Client, with all other neccessities to get started!'
              actions={
                <Button
                  variant='outlined'
                  target='_blank'
                  href='/acap/onboarding/automation'
                >Get Onboarded
                </Button>
              }
            />
            <FeatureSnippet
              icon={<AssessmentOutlined />}
              half
              title='ACAP Usage'
              text='ACAP Reports on weekly usage so we can show AutoZone what we bring to the table. Enjoy these dashboards with the time you saved not manually getting certificates'
              actions={<Button variant='outlined' href='/acap/usage/reports'>ACAP Usage</Button>}
            />
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
}
