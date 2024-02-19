import { renderHook } from '@testing-library/react'

import useScrollToTop from '../useScrollToTop'

jest.useFakeTimers()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({ pathname: '/' })),
}))

const spyScrollTo = jest.fn()
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo })

describe('useScrollToTop', () => {
  it('should call "scrollTo" method', () => {
    renderHook(useScrollToTop)
    jest.runAllTimers()

    expect(spyScrollTo).toHaveBeenCalledWith(0, 0)
  })
})
