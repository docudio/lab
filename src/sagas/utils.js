import crypto from 'crypto'

function base64URLEncode (str) {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function sha256 (buffer) {
  return crypto.createHash('sha256').update(buffer).digest()
}

export const generatePkceValues = () => {
  if (getPkceValues()) { return getPkceValues() }

  const verifier = base64URLEncode(crypto.randomBytes(32))
  const challenge = base64URLEncode(sha256(verifier))

  return { verifier, challenge }
}
{ /*
export const getPkceValues = () => {
  return sessionStorage.getItem('pkceValues')
    ? JSON.parse(sessionStorage.getItem('pkceValues'))
    : undefined
}

export const setPkceValues = pkceValues => {
  sessionStorage.setItem('pkceValues', JSON.stringify(pkceValues))
}

export const removePkceValues = () => {
  sessionStorage.removeItem('pkceValues')
}
*/ }
export const getAuthToken = () => {
  return localStorage.getItem('authToken')
    ? JSON.parse(localStorage.getItem('authToken'))
    : undefined
}
export const getDarkModePreference = () => {
  return localStorage.getItem('DarkModePreferred')
    ? localStorage.getItem('DarkModePreferred')
    : false
}
export const setDarkModePreference = (preference) => {
  localStorage.setItem('DarkModePreferred', preference.payload)
}

export const setAuthToken = token => {
  localStorage.setItem('authToken', JSON.stringify(token))
}

export const removeAuthToken = () => {
  localStorage.removeItem('authToken')
}

export const getAuthorizationHeader = accessToken => {
  return { Authorization: `Bearer ${accessToken}` }
}

export const decodeTrustedClaims = trustedClaims => {
  const encodedTrustedClaims = trustedClaims.replace('Authorization: TrustedClaims', '').trim()
  const decodedTrustedClaims = Buffer.from(encodedTrustedClaims, 'base64').toString()
  return JSON.parse(decodedTrustedClaims)
}
