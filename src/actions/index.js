export const APP_LOAD = 'APP_LOAD'
export const APP_LOAD_SUCCESS = 'APP_LOAD_SUCCESS'
export const APP_LOAD_FAILURE = 'APP_LOAD_FAILURE'
export const APP_UNLOAD = 'APP_UNLOAD'
export const API_ERRORED = 'API_ERRORED'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE'

export const loadApp = () => ({
  type: APP_LOAD
})

export const enqueueSnackbar = (notification) => {
  return {
    type: ADD_MESSAGE,
    notification: {
      ...notification,
      key: new Date().getTime() + Math.random()
    }
  }
}

export const closeSnackbar = key => ({
  type: CLOSE_MESSAGE,
  dismissAll: !key, // dismiss all if no key has been defined
  key
})

export const removeSnackbar = key => ({
  type: REMOVE_MESSAGE,
  key
})
