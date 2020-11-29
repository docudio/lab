import { call, put } from 'redux-saga/effects'
import { getAuthToken, getDarkModePreference } from '../utils'
import { APP_LOAD_SUCCESS, APP_LOAD_FAILURE, ADD_MESSAGE } from '../../actions'
import { ACCESS_TOKEN_SUCCESS } from '../../actions/auth'
import { THEME_LIGHT_PREFERRED, THEME_DARK_PREFERRED } from '../../actions/theme'
import auth from './auth'

function * handleAppLoad () {
  try {
    const authToken = yield call(getAuthToken)
    const DarkModePreference = yield call(getDarkModePreference)

    if (authToken) {
      yield put({ type: ACCESS_TOKEN_SUCCESS })
      yield call(auth.fetchUserClaims)
    }

    if (DarkModePreference === 'true') {
      yield put({ type: THEME_DARK_PREFERRED, payload: DarkModePreference })
    } else if (DarkModePreference === 'false') {
      yield put({ type: THEME_LIGHT_PREFERRED, payload: DarkModePreference })
    }

    yield put({ type: APP_LOAD_SUCCESS })
  } catch (e) {
    yield put({ type: APP_LOAD_FAILURE, payload: e })
  }
}

function * sendErrorMessage (e) {
  yield put({ type: ADD_MESSAGE, payload: { ...e, options: { variant: 'error' } } })
}

export default {
  sendErrorMessage,
  handleAppLoad
}
