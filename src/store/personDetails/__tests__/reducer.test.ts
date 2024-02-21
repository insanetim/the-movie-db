import { mergeDeepRight } from 'ramda'

import { fetchPersonDetails } from '../actions'
import personDetailsReducer, { personDetailsInitialState } from '../reducer'

describe('personDetailsReducer', () => {
  const state = personDetailsInitialState

  it('should return initial state with empty action', () => {
    const result = personDetailsReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "fetchPersonDetails/pending" action', () => {
    const action = {
      type: fetchPersonDetails.pending.type,
    }
    const result = personDetailsReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchPersonDetails/fulfilled" action', () => {
    const action = {
      payload: { data: 'test/data', id: '1234' },
      type: fetchPersonDetails.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      entities: { '1234': { data: 'test/data', id: '1234' } },
      ids: ['1234'],
      loading: false,
    })
    const result = personDetailsReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchPersonDetails/rejected" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchPersonDetails.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      error: action.payload,
      loading: false,
    })
    const result = personDetailsReducer(state, action)

    expect(result).toEqual(newState)
  })
})
