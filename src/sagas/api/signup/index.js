import { takeLeading, call, put } from 'redux-saga/effects'
import agent from './agent'
import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../../../actions/signup'
import apiCaller from '../api-caller'
import app from '../../app/app'
import { ADD_MESSAGE } from '../../../actions'

export default function * watcherSaga () {
  yield takeLeading(SIGNUP_REQUESTED, submitSignup)
}

function * submitSignup (action) {
  try {
    yield put({ type: ADD_MESSAGE, payload: { message: 'Request is being Submitted', options: { variant: 'info' } } })

    const payload = yield call(apiCaller, agent.Signup.submitSignup, { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(action.payload) })
    yield put({ type: ADD_MESSAGE, payload: { message: 'Request Submitted Successfully!', options: { variant: 'success' } } })
    yield put({ type: SIGNUP_SUCCESS, payload: payload.data })
  } catch (e) {
    yield put({ type: SIGNUP_FAILURE, payload: { message: 'Signup failed, please contact docudio@gmail.com if this persists after refreshing your page' } })
    yield call(app.sendErrorMessage, e)
  }
}
