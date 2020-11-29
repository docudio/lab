import { requests } from '../../agent'

const port = process.env.port === '3001' ? '3000' : '443'
const protocol = process.env.port === '3001' ? 'http' : 'https'
const API_ROOT = protocol + '://' + process.env.hostname + ':' + port
const ROOT_AUTH_URI = process.env.REACT_APP_APIGW + '/auth/oauth/v2'
const TRUSTED_CLAIMS_URI = process.env.REACT_APP_APIGW + '/auth/oauth/v2/tokeninfo'
const USER_ROOT = '/api/docudio/v1/'
const USER_SEARCH_ROOT = '/api/docudio/v1/ldap/users'
// Used strictly for local development and reverse proxying requests
const portlocal = process.env.NEXT_PUBLIC_port === '3001' ? '3000' : '443'
const NGINX_API_ROOT = process.env.NEXT_PUBLIC_protocol + '://' + process.env.NEXT_PUBLIC_hostname + ':' + portlocal
const AUTH_PARMS = {
  client_id: '',
  redirect_uri: process.env.NEXT_PUBLIC_protocol + '//' + process.env.hostname + ':' + process.env.port + '/auth',
  code_challenge_method: 'S256',
  response_type: 'code',
  scope: ''
}

const Signup = {
  submitSignup: (options) => requests.postprops(`${NGINX_API_ROOT}${USER_ROOT}signup`, options)
}

export default {
  Signup
}
