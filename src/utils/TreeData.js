import React from 'react'
import TreeItem from '@material-ui/lab/TreeItem'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import _ from 'lodash'
import { makeStyles, Typography, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 700
  },
  label: {
    fontWeight: 'inherit',
    color: 'inherit'
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3)
    }
  }
}))

export default function TreeData (props) {
  const classes = useStyles()
  const { data } = props

  const renderTree = (key, value) => (
    <TreeItem
      key={key}
      nodeId={key}
      label={
        <div className={classes.labelRoot}>
          <Typography variant='body2' className={classes.labelText}>
            <b>{_.startCase(key)}</b>
          </Typography>
          <Typography variant='caption' color='inherit'>
            {(value === Object(value) ? '' : value.toString())}
          </Typography>
        </div>
      }
      classes={{
        label: classes.label
      }}>
      {value === Object(value) ? Object.entries(value).map(([k, v]) => renderTree(k, v)) : null}
    </TreeItem>

  )
  return (
    <Paper>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {data.map(([k, v]) => renderTree(k, v))}
      </TreeView>
    </Paper>
  )
}
