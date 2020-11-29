import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { Link } from '../i18n'

export default function ListItemLink (props) {
  const { icon, primary, to, className, actions } = props

  return (
    <Link
      activeClassName='Mui-selected'
      href={to}
      passHref

    >
      <ListItem onClick={props.handleDrawerClose} button className={className} >
        {actions ? <ListItemSecondaryAction>
          {actions}
        </ListItemSecondaryAction>
          : <> </>}
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </Link>
  )
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}
