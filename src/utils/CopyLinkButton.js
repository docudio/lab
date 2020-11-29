import React from 'react'
import { useSnackbar } from 'notistack'
import copy from 'clipboard-copy'
import { IconButton } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link'
import { useRouteMatch } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'

export default function CopyLinkButton (props) {
  const { data, externalLink, toolTip, toolTipContent } = props
  const { url } = useRouteMatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleClick = () => {
    enqueueSnackbar('Copied to Clipboard!', { variant: 'success' })
    if (externalLink) {
      return copy(`${data}`)
    } else {
      return copy(`${process.env.protocol}//${process.env.hostname}:${process.env.port}${url}/${data}`)
    }
  }

  return (
    toolTip
      ? <Tooltip title={toolTipContent}>
        <IconButton onClick={handleClick}><LinkIcon /></IconButton>
      </Tooltip>
      : <IconButton onClick={handleClick}><LinkIcon /></IconButton>

  )
}
