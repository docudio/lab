import { APP_LOAD_SUCCESS, ADD_MESSAGE, REMOVE_MESSAGE } from '../../actions'

const defaultState = {
  appName: 'selfServices',
  notifications: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD_SUCCESS:
      return {
        ...state,
        appLoaded: true
      }
    case ADD_MESSAGE:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...action.payload, key: new Date().getTime() + Math.random() }
        ]
      }
    case REMOVE_MESSAGE:
      return {
        ...state,
        notifications: [...state.notifications.filter(message => message.key !== action.key)]
      }
    default:
      return state
  }
}
