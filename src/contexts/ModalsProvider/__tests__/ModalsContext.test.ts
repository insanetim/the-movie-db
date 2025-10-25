import { renderHook } from '@testing-library/react'
import { createElement, ReactNode } from 'react'
import {
  ModalsContext,
  ModalsContextType,
  useModalsContext,
} from 'src/contexts/ModalsProvider'

const createWrapper =
  (value: ModalsContextType) =>
  ({ children }: { children: ReactNode }) =>
    createElement(ModalsContext.Provider, { value }, children)

describe('useModalsContext', () => {
  it('returns context value when used within ModalsProvider', () => {
    const dispatch = jest.fn()
    const modals: ModalsContextType['modals'] = []
    const value = { dispatch, modals }

    const { result } = renderHook(() => useModalsContext(), {
      wrapper: createWrapper(value),
    })

    expect(result.current).toBe(value)
  })

  it('throws when used outside of ModalsProvider', () => {
    let error: unknown

    try {
      renderHook(() => useModalsContext())
    } catch (err) {
      error = err
    }

    expect(error).toEqual(
      new Error('useModalsContext must be used within a ModalsProvider')
    )
  })
})
