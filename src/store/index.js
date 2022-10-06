import { configureStore } from '@reduxjs/toolkit'
import { createLogicMiddleware } from 'redux-logic'

import logics from './logics'
import rootReducer from './rootReducer'

const logicMiddleware = createLogicMiddleware(logics)

const store = configureStore({
  reducer: rootReducer,
  middleware: [logicMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
