
import React from 'react'
import { makeStyles, Divider } from '@material-ui/core'
import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

const useStyles = makeStyles(({
  root: {
  },
  content: {
    padding: 0,
    overflow: 'auto',
    maxHeight: 500
  }
}))

export default function ListCard (props) {
  const { headerAction, headerTitle, data, renderItem } = props
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        action={
          headerAction
        }
        title={
          headerTitle
        }
      />
      <Divider />
      <CardContent className={classes.content}>
        <List disablePadding>
          {data ? data.map((item, index) =>
            renderItem(item, index)
          ) : <p>LOADING...</p>}
        </List>
      </CardContent>
    </Card>
  )
}
