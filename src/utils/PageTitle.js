import React, { useState, useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'

export default function PageTitle () {
  const location = useLocation()
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(1)
    },
    title: {
      fontSize: 24
    }
  }))

  const classes = useStyles()
  const [sectionTitle, setSectionTitle] = useState('')
  const [pageTitle, setPageTitle] = useState('')

  useEffect(() => {
    const urlSections = location.pathname.substr(1).split('/')
    setSectionTitle(urlSections[0])
    setPageTitle(urlSections.slice(1).map(s => _.upperFirst(s)).join(' - '))
  }, [location.pathname])

  return (
    <div className={classes.root}>
      <Typography color='textSecondary' variant='overline' display='block'>
        {sectionTitle}
      </Typography>
      <Typography className={classes.title} component='h1' variant='h3'>
        {pageTitle}
      </Typography>
    </div>
  )
}
