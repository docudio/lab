export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const signupRequested = payload => ({
  type: SIGNUP_REQUESTED,
  payload
})
