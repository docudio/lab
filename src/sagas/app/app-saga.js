import { takeEvery, takeLeading } from 'redux-saga/effects'
import { API_ERRORED, APP_LOAD } from '../../actions'
import app from './app'
import { ACCESS_TOKEN_REQUEST, LOGOUT_REQUEST, TOKEN_INFO_REQUEST, TRUSTED_CLAIMS_SUCCESS } from '../../actions/auth'
import { THEME_UPDATE } from '../../actions/theme'
import auth from './auth'
import { setDarkModePreference } from '../utils'

export default function * watcherSaga () {
  yield takeEvery(API_ERRORED, app.sendErrorMessage)
  yield takeLeading(APP_LOAD, app.handleAppLoad)
  yield takeLeading(ACCESS_TOKEN_REQUEST, auth.fetchAccessToken)
  yield takeEvery(LOGOUT_REQUEST, auth.clearSession)
  yield takeEvery(THEME_UPDATE, setDarkModePreference)
  yield takeLeading(TOKEN_INFO_REQUEST, auth.fetchTokenInfo)
  yield takeLeading(TRUSTED_CLAIMS_SUCCESS, auth.fetchAuthUserDetails)
  yield takeLeading(TRUSTED_CLAIMS_SUCCESS, auth.fetchEmployeeType)
}
