import { THEME_UPDATE, THEME_DARK_PREFERRED, THEME_LIGHT_PREFERRED } from '../../actions/theme'

const defaultState = {
  preferred: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case THEME_DARK_PREFERRED:
      return {
        ...state,
        preferred: true
      }
    case THEME_LIGHT_PREFERRED:
      return {
        ...state,
        preferred: false
      }
    case THEME_UPDATE:
      return {
        ...state,
        preferred: action.payload
      }
    default:
      return state
  }
}
