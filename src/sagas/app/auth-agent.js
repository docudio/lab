import { requests } from '../agent'

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

const authPostHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' }

const Auth = {
  getAccessToken: (data) => requests.post(
    `${ROOT_AUTH_URI}/token?client_id=${AUTH_PARMS.client_id}&redirect_uri=${AUTH_PARMS.redirect_uri}&code_verifier=${pkceValues.verifier}&code=${data.code}&grant_type=authorization_code&state=${JSON.stringify(data.from)}`,
    { headers: authPostHeaders }
  ),
  refreshAccessToken: (refreshToken) => requests.post(
    `${ROOT_AUTH_URI}/token?grant_type=refresh_token&client_id=${AUTH_PARMS.client_id}&refresh_token=${refreshToken}&redirect_uri=${AUTH_PARMS.redirect_uri}`,
    { headers: authPostHeaders }
  ),
  clearSession: (token) => requests.post(
    `${ROOT_AUTH_URI}/token/revoke?client_id=${AUTH_PARMS.client_id}&token_type_hint=access_token&token=${token}`,
    { headers: { ...authPostHeaders, Authorization: '' }, credentials: 'include' }
  ),
  getTokenInfo: (options) => requests.get(`${ROOT_AUTH_URI}/tokenInfo`, options),
  getTrustedClaims: (options) => requests.get(`${TRUSTED_CLAIMS_URI}`, options)
}

export default {
  Auth
}
