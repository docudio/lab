export const THEME_UPDATE = 'THEME_UPDATE'
export const THEME_LIGHT_PREFERRED = 'THEME_LIGHT_PREFERRED'
export const THEME_DARK_PREFERRED = 'THEME_DARK_PREFERRED'

export const themeUpdate = payload => ({
  type: THEME_UPDATE,
  payload
})
