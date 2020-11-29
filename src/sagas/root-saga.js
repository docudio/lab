import { all } from 'redux-saga/effects'
import appSaga from './app/app-saga'
import Signup from './api/signup'

export default function * rootSaga () {
  yield all([
    appSaga(),
    Signup()
  ])
}
