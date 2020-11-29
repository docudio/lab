import React from 'react'
import Divider from '@material-ui/core/Divider'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(3)
  }
}))

export default function DocDivider () {
  const classes = useStyles()
  return (
    <Divider className={classes.divider} variant='fullWidth' height='100%'/>
  )
}
