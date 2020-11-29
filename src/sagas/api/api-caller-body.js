import { setAuthToken } from '../utils'
import { call } from 'redux-saga/effects'
import authAgent from '../app/auth-agent'

export default function * apiCallerBody (request, {
  headers = {},
  ...rest
}) {
//  const token = yield call(getAuthToken)
  const props = {
    ...rest,
    headers: {
      ...headers
    //  token: token.access_token
    },
    body: JSON.stringify({
      data: {
        ...rest.body.data
      },
      //   token: token.access_token,
      ...rest.body
    }
    )
  }
  const response = yield call(request, props)

  if (response) {
    if (response.statusCode === 401) {
      const refreshedToken = yield call(authAgent.Auth.refreshAccessToken, token.refresh_token)
      yield call(setAuthToken, refreshedToken)
      if (refreshedToken) {
        return yield call(apiCallerBody, props)
      }
    }
    return response
  }
  return {}
}
