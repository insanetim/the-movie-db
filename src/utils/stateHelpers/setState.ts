/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IState } from 'src/interfaces/global.interface'

const setState = {
  fulfilled: <T>(state: IState<T>, action: PayloadAction<any>) => {
    state.loading = false
    state.data = action.payload
  },
  pending: <T>(state: IState<T>) => {
    state.loading = true
    state.data = null
    state.error = null
  },
  rejected: <T>(state: IState<T>, action: PayloadAction<any>) => {
    state.loading = false
    state.error = action.payload
  }
}

export default setState