import { configureStore } from '@reduxjs/toolkit'
import { createLogicMiddleware } from 'redux-logic'
import httpClient from 'src/api/httpClient'

import logics from './logics'
import reducer from './reducer'

const deps = { httpClient }
const logicMiddleware = createLogicMiddleware(logics, deps)

const store = configureStore({
  reducer,
  middleware: [logicMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
