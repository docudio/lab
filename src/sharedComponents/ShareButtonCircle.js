import { cx, css } from '@emotion/css'
import PropTypes from 'prop-types'
import React from 'react'

import colors from './colors'
import ShareButton from './ShareButton'

const styles = css`
  align-items: center;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 44px;
  justify-content: center;
  margin: 3px;
  position: relative;
  transition: 0.3s;
  width: 44px;
  &::before {
    background-color: rgba(255, 255, 255, 0.2);
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
    color: inherit;
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-100%, -50%);
    transition: 0.2s;
    width: 50%;
  }
  & > svg {
    fill: #fff;
    height: auto;
    transform: scale(1);
    transition: 0.3s;
    width: 22px;
    z-index: 1;
  }
  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.1);
      transform: translate(0%, -50%) rotateY(180deg);
    }
    & > svg {
      transform: scale(1.2);
    }
  }
  @media (any-hover: none) {
    &:hover {
      &::before {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translate(-100%, -50%);
      }
      & > svg {
        transform: scale(1);
      }
    }
  }
  @media (min-width: 330px) {
    margin: 5px;
  }
  @media (min-width: 600px) {
    margin: 7px;
  }
  @media (min-width: 1025px) {
    margin: 10px;
  }
`

const stylesnoColor = css`
  align-items: center;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 33px;
  justify-content: center;
  margin: 3px;
  position: relative;
  transition: 0.3s;
  width: 33px;
  &::before {
    background-color: rgba(255, 255, 255, 0.2);
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
    color: inherit;
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-100%, -50%);
    transition: 0.2s;
    width: 50%;
  }
  & > svg {
    height: auto;
    transform: scale(1);
    transition: 0.3s;
    width: 22px;
    z-index: 1;
  }
  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.1);
      transform: translate(0%, -50%) rotateY(180deg);
    }
    & > svg {
      transform: scale(1.2);
    }
  }
  @media (any-hover: none) {
    &:hover {
      &::before {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translate(-100%, -50%);
      }
      & > svg {
        transform: scale(1);
      }
    }
  }
  @media (min-width: 330px) {
    margin: 2px;
  }
  @media (min-width: 600px) {
    margin: 3px;
  }
  @media (min-width: 1025px) {
    margin: 3px;
  }
`

const dynamicStyles = props => css`
  background: ${colors[props.network]};
`

const ShareButtonCircle = props => {
  const { className, ...rest } = props
  const dynamicStylesStr = props.noColor ? '' : dynamicStyles(props)
  const styletoApply = props.noColor ? stylesnoColor : styles
  return (
    <ShareButton
      className={cx(styletoApply, dynamicStylesStr, className)}
      {...rest}
    />
  )
}

ShareButtonCircle.propTypes = {
  className: PropTypes.any
}

export default ShareButtonCircle
