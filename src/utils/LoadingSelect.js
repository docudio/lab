import React from 'react'
import { makeStyles, InputLabel, Select, MenuItem, CircularProgress } from '@material-ui/core'
import _ from 'lodash'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

export default function LoadingSelect (props) {
  const classes = useStyles()
  const { value, onChange, items, loading, label } = props

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <InputLabel>{label}</InputLabel>
        <Select disabled={loading} value={value} onChange={onChange}>
          {items.map((c, i) => <MenuItem value={c} key={i}>{_.startCase(c.type)}</MenuItem>)}
        </Select>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  )
}
