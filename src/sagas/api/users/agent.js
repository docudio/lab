import { requests } from '../../agent'

const port = process.env.port === '3001' ? '3000' : '443'
const protocol = process.env.port === '3001' ? 'http' : 'https'
const API_ROOT = protocol + '://' + process.env.hostname + ':' + port
const ROOT_AUTH_URI = process.env.REACT_APP_APIGW + '/auth/oauth/v2'
const TRUSTED_CLAIMS_URI = process.env.REACT_APP_APIGW + '/auth/oauth/v2/tokeninfo'
const USER_ROOT = '/api/docudio/v1/groups/'
const USER_SEARCH_ROOT = '/api/docudio/v1/ldap/users'
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

const User = {
  getUser: (options) => requests.get(`${NGINX_API_ROOT}${USER_ROOT}${options.user}/isValid`, options),
  userSearch: (options) => requests.get(`${NGINX_API_ROOT}${USER_SEARCH_ROOT}${options.user}`, options)
}

export default {
  User
}
