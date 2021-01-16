import React, { useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { accessTokenRequest } from '../actions/auth'
import { CircularProgress } from '@material-ui/core'
import { usePkceValues } from './hooks'

export default function Auth () {
  const port = process.env.port === '3001' ? '3000' : '443'
  const protocol = process.env.port === '3001' ? 'http' : 'https'
  const ROOT_AUTH_URI = process.env.REACT_APP_APIGW + '/auth/oauth/v2'
  // Used strictly for local development and reverse proxying requests
  const portlocal = process.env.port === '3001' ? '3000' : '443'
  const NGINX_API_ROOT = process.env.protocol + '//' + process.env.hostname + ':' + portlocal
  const AUTH_PARMS = {
    client_id: '',
    redirect_uri: process.env.protocol + '//' + process.env.hostname + ':' + process.env.port + '/auth',
    code_challenge_method: 'S256',
    response_type: 'code',
    scope: ''
  }

  const dispatch = useDispatch()
  const isAuthorized = useSelector(state => state.auth.isAuthorized)
  const pkceValues = usePkceValues()
  const location = useLocation()
  const { state, code } = Array.from(new URLSearchParams(location.search)).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: value }),
    {}
  )
  const { from } = location.state || { from: state ? JSON.parse(state) : { pathname: '/' } }

  useEffect(() => {
    if (code) {
      dispatch(accessTokenRequest({ code: code }))
    }
  }, [code, dispatch])

  useEffect(() => {
    if (!isAuthorized && !code && pkceValues) {
      process.env.replace(`${ROOT_AUTH_URI}/authorize?scope=${AUTH_PARMS.scope}&response_type=${AUTH_PARMS.response_type}&client_id=${AUTH_PARMS.client_id}&redirect_uri=${AUTH_PARMS.redirect_uri}&code_challenge=${pkceValues.challenge}&code_challenge_method=${AUTH_PARMS.code_challenge_method}&state=${encodeURIComponent(JSON.stringify(from))}`
      )
    }
  }, [isAuthorized, code, from, pkceValues])

  if (isAuthorized) {
    return (<Redirect to={from} push={false} />)
  }

  return (<CircularProgress />)
}
