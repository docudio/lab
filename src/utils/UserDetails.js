import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardHeader, Avatar, Badge } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(({
  root: {
    flexGrow: 1
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

export default function UserDetails () {
  const classes = useStyles
  const trustedClaims = useSelector(state => state.auth.trustedClaims)

  if (!trustedClaims) {
    return (<></>)
  }

  return (
    <Card variant='outlined' className={classes.root}>
      <CardHeader
        avatar={
          <Badge color='secondary' overlap='circle' variant='dot' anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}>
            <Avatar className={classes.avatar}>
              {`${trustedClaims.claims.givenname ? trustedClaims.claims.givenname[0] : 'N'}${trustedClaims.claims.sn ? trustedClaims.claims.sn[0] : 'A'}`}
            </Avatar>
          </Badge>}
        title={trustedClaims.claims ? trustedClaims.claims.cn : 'NA'}
        subheader={trustedClaims.claims ? trustedClaims.claims.uid : 'NA'}
      />
    </Card>
  )
}
