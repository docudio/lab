import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { themeUpdate } from '../actions/theme'

import Brightness7Icon from '@material-ui/icons/Brightness7'

import Tooltip from '@material-ui/core/Tooltip'

export default function DarkModeToggle () {
  const preferred = useSelector(state => state.theme.preferred)
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(themeUpdate(!preferred))
  }

  return (
    <Tooltip style={{ float: 'right', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }} title='Toggle Dark Mode Preferences' interactive>

      <Button variant='contained' color='primary' onClick={handleChange} disableElevation><Brightness7Icon/></Button>
    </Tooltip>

  )
}
