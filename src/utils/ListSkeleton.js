import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  skeleton: {
    margin: theme.spacing(3)
  }
}))

const AllSkeletons = (listitems, number) => {
  const classes = useStyles()
  const myArray = []
  for (let i = 0; i < number; i++) {
    myArray.push(<Skeleton key={i} className={classes.skeleton} variant='rect' height='12.5%' />)
  }
  return myArray
}

export default function ListSkeleton (props) {
  const { loading, number, listItems } = props

  const localload = loading

  if (listItems) {
    return (
      localload && AllSkeletons(true, number)
    )
  } else if (number) {
    return (
      <>
        {localload && AllSkeletons(false, number)}
      </>
    )
  } else {
    return (
      <>
        {localload && <Skeleton variant='rect' height='100%' />}
      </>
    )
  }
}
