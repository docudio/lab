import React from 'react'
import { makeStyles, Paper, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const searchStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: theme.spacing(1)
  }
}))

export default function SearchBar (props) {
  const classes = searchStyles()
  const { onChange, value } = props
  return (
    <Paper component='form' className={classes.root}>
      <InputBase onChange={onChange} value={value} className={classes.input} placeholder='Search' />
      <div className={classes.iconButton}>
        <SearchIcon />
      </div>
    </Paper>
  )
}
