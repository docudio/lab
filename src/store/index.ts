import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import app from './App'
import theme from './Theme'
import auth from './Auth'

const store = configureStore({
  reducer: {
    app,theme,auth
  },
  middleware: [...getDefaultMiddleware()]
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store
