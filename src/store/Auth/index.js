import {
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  TRUSTED_CLAIMS_SUCCESS,
  TRUSTED_CLAIMS_FAILURE,
  TOKEN_INFO_SUCCESS,
  AUTH_USER_DETAILS_SUCCESS,
  USER_TYPE_SEARCH_SUCCESS
} from '../../actions/auth'

const defaultState = {
  isAuthorized: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthorized: true
      }
    case ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        message: action.payload,
        isAuthorized: false
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        message: action.payload,
        isAuthorized: false
      }
    case LOGOUT_SUCCESS:
      return {
      }
    case TRUSTED_CLAIMS_SUCCESS:
      return {
        ...state,
        trustedClaims: action.payload
      }
    case TRUSTED_CLAIMS_FAILURE:
      return {
        ...state,
        trustedClaims: undefined,
        message: action.payload
      }
    case TOKEN_INFO_SUCCESS:
      return {
        ...state,
        tokenInfo: action.payload
      }
    case AUTH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload
      }
    case USER_TYPE_SEARCH_SUCCESS:
      return {
        ...state,
        isEmployee: action.payload.isValid
      }
    default:
      return state
  }
}
