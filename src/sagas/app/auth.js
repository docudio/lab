import { call, put } from 'redux-saga/effects'
import agent from './auth-agent'
import userAgent from '../api/users/agent'
import { ACCESS_TOKEN_SUCCESS, LOGOUT_SUCCESS, TRUSTED_CLAIMS_FAILURE, TRUSTED_CLAIMS_SUCCESS, TOKEN_INFO_REQUEST, AUTH_USER_DETAILS_SUCCESS, USER_TYPE_SEARCH_SUCCESS, USER_TYPE_SEARCH_FAILURE } from '../../actions/auth'
import { setAuthToken, getAuthToken, decodeTrustedClaims } from '../utils'
import apiCaller from '../api/api-caller'
import app from './app'

function * fetchAccessToken (action) {
  try {
    const payload = yield call(agent.Auth.getAccessToken, action.payload)
    yield call(setAuthToken, payload.data)
    yield put({ type: ACCESS_TOKEN_SUCCESS, payload: payload.data })
    yield call(fetchUserClaims)
  } catch (e) {
    yield call(app.sendErrorMessage, e)
  }
}

function * clearSession () {
  try {
    const token = yield call(getAuthToken)
    yield call(agent.Auth.clearSession, token)
    yield put({ type: LOGOUT_SUCCESS })
  } catch (e) {
    yield call(app.sendErrorMessage, e)
  }
}

function * fetchUserClaims () {
  try {
    const response = yield call(apiCaller, agent.Auth.getTrustedClaims, { headers: {} })
    const trustedClaims = yield call(decodeTrustedClaims, response.data)
    yield put({ type: TRUSTED_CLAIMS_SUCCESS, payload: trustedClaims })
  } catch (e) {
    yield put({ type: TRUSTED_CLAIMS_FAILURE, payload: e })
    yield call(app.sendErrorMessage, e)
  }
}

function * fetchAuthUserDetails (action) {
  try {
    const payload = yield call(apiCaller, userAgent.User.getUser, { headers: {}, user: action.payload.claims.uid })
    yield put({ type: AUTH_USER_DETAILS_SUCCESS, payload: payload.data })
  } catch (e) {
    yield call(app.sendErrorMessage, e)
  }
}

function * fetchTokenInfo () {
  try {
    const response = yield call(apiCaller, agent.Auth.getTokenInfo, { headers: {} })
    yield put({ type: TOKEN_INFO_REQUEST, payload: response })
  } catch (e) {
    yield call(app.sendErrorMessage, e)
  }
}

function * fetchEmployeeType () {
  try {
    const payload = yield call(apiCaller, userAgent.User.fetchEmployeeType, { headers: {} })
    yield put({ type: USER_TYPE_SEARCH_SUCCESS, payload: payload.data })
  } catch (e) {
    yield put({ type: USER_TYPE_SEARCH_FAILURE, payload: {} })
    yield call(app.sendErrorMessage, e)
  }
}

export default {
  fetchUserClaims,
  fetchAccessToken,
  fetchTokenInfo,
  fetchAuthUserDetails,
  fetchEmployeeType,
  clearSession
}
