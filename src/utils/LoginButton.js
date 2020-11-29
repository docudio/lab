import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { requestLogout } from '../../actions/auth'

export default function LoginButton () {
  const isAuthorized = useSelector(state => state.auth.isAuthorized)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogoutClick = () => {
    dispatch(requestLogout())
    history.push('/')
  }

  if (isAuthorized) {
    return (<Button variant='contained' color='primary' disableElevation onClick={handleLogoutClick}>Logout</Button>)
  }

  return (
    <Button variant='contained' color='primary' disableElevation component={RouterLink} to='/auth'>Login</Button>
  )
}
