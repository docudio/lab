import React from 'react'
import PropTypes from 'prop-types'

import ShareButton from './ShareButton'
import { Grid } from '@material-ui/core'

const ShareBlock = props => {
  const {
    url,
    button: Button = ShareButton,
    buttons,
    className,
    buttonClassName,
    header = '',
    ...blockRest
  } = props

  return (

    <Grid container alignContent={props.left ? '' : 'center'} justify={props.left ? '' : 'center'} direction='row'
      spacing={0} >

      {buttons.map(button => {
        const { network, icon: Icon, ...buttonRest } = button
        const rest = { ...blockRest, ...buttonRest }

        return (
          <Grid item xl='auto' xs='3' sm='3' md='auto' lg='auto' >
            <Button
              key={network}
              network={network}
              url={url}
              className={buttonClassName}
              {...rest}
            >
              <Icon color='action'/>
            </Button>
          </Grid>
        )
      })}
    </Grid>
  )
}

ShareBlock.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
  longtext: PropTypes.string,
  button: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired,
  buttonClassName: PropTypes.string,
  header: PropTypes.string,
  className: PropTypes.string
}

export default ShareBlock
