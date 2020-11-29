import { takeLeading, takeLatest, call, put, delay } from 'redux-saga/effects'
import agent from './agent'
import {
  USER_LOOKUP_REQUESTED,
  USER_LOOKUP_SUCCESS,
  USER_LOOKUP_FAILURE,
  USER_SEARCH_REQUESTED,
  USER_SEARCH_SUCCESS
} from '../../../actions/users'
import apiCaller from '../api-caller'
import app from '../../app/app'

export default function * watcherSaga () {
  yield takeLeading(USER_LOOKUP_REQUESTED, fetchUser)
  yield takeLatest(USER_SEARCH_REQUESTED, searchUser)
}

function * fetchUser (action) {
  try {
    const payload = yield call(apiCaller, agent.User.getUser, { headers: {}, user: action.payload })
    yield put({ type: USER_LOOKUP_SUCCESS, payload: payload.data })
  } catch (e) {
    yield put({ type: USER_LOOKUP_FAILURE, payload: { message: 'Fetching this user failed, please contact docudio@gmail.com if this persists after refreshing your page' } })
    yield call(app.sendErrorMessage, e)
  }
}

function * searchUser (action) {
  try {
    yield delay(500)
    const payload = yield call(apiCaller, agent.User.userSearch, { headers: {}, user: action.payload })
    yield put({ type: USER_SEARCH_SUCCESS, payload: payload.data ? payload.data : [] })
  } catch (e) {
    yield call(app.sendErrorMessage, 'Searching for a user failed, please contact docudio@gmail.com if this persists after refreshing your page')
  }
}
