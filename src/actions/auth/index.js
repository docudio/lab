export const ACCESS_TOKEN_REQUEST = 'ACCESS_TOKEN_REQUEST'
export const ACCESS_TOKEN_SUCCESS = 'ACCESS_TOKEN_SUCCESS'
export const ACCESS_TOKEN_FAILURE = 'ACCESS_TOKEN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const TRUSTED_CLAIMS_REQUEST = 'TRUSTED_CLAIMS_REQUEST'
export const TRUSTED_CLAIMS_SUCCESS = 'TRUSTED_CLAIMS_SUCCESS'
export const TRUSTED_CLAIMS_FAILURE = 'TRUSTED_CLAIMS_FAILURE'

export const TOKEN_INFO_REQUEST = 'TOKEN_INFO_REQUEST'
export const TOKEN_INFO_SUCCESS = 'TOKEN_INFO_SUCCESS'

export const AUTH_USER_DETAILS_REQUEST = 'AUTH_USER_DETAILS_REQUEST'
export const AUTH_USER_DETAILS_SUCCESS = 'AUTH_USER_DETAILS_SUCCESS'

export const USER_TYPE_SEARCH_REQUESTED = 'USER_TYPE_SEARCH_REQUESTED'
export const USER_TYPE_SEARCH_SUCCESS = 'USER_TYPE_SEARCH_SUCCESS'
export const USER_TYPE_SEARCH_FAILURE = 'USER_TYPE_SEARCH_FAILURE'

export const accessTokenRequest = payload => ({
  type: ACCESS_TOKEN_REQUEST,
  payload
})

export const accessTokenSuccess = payload => ({
  type: ACCESS_TOKEN_SUCCESS,
  payload
})

export const accessTokenFailure = payload => ({
  type: ACCESS_TOKEN_FAILURE,
  payload
})

export const requestLogout = payload => ({
  type: LOGOUT_REQUEST,
  payload
})

export const recieveLogout = payload => ({
  type: LOGOUT_SUCCESS,
  payload
})

export const logoutFailure = payload => ({
  type: LOGOUT_FAILURE,
  payload
})

export const getTrustedClaims = () => ({
  type: TRUSTED_CLAIMS_REQUEST
})

export const getTokenInfo = () => ({
  type: TOKEN_INFO_REQUEST
})

export const getUserType = () => ({
  type: USER_TYPE_SEARCH_REQUESTED
})
