import { getAuthToken, setAuthToken, removeAuthToken } from '../utils'
import { call, put } from 'redux-saga/effects'
import authAgent from '../app/auth-agent'
import { ACCESS_TOKEN_FAILURE } from '../../actions/auth'

export default function * apiCaller (request, {
  headers = {},
  ...rest
}) {
  const token = yield call(getAuthToken)
  // const authorizeHeader = yield call(getAuthorizationHeader, token.access_token)
  const props = {
    ...rest,
    headers: {
      ...headers
      //   ...authorizeHeader,
    //  token: token.access_token
    }
  }

  try {
    const response = yield call(request, props)
    return response || {}
  } catch (e) {
    if (e.status === 401) {
      try {
        const refreshedToken = yield call(authAgent.Auth.refreshAccessToken, token.refresh_token)
        if (refreshedToken) {
          yield call(setAuthToken, refreshedToken.data)
          return yield call(apiCaller, request, props)
        }
      } catch (refreshError) {
        if (refreshError.status === 400) {
          yield call(removeAuthToken)
          yield put({ type: ACCESS_TOKEN_FAILURE, payload: refreshError.message })
        } else {
          throw refreshError
        }
      }
    } else {
      throw e
    }
  }
}
