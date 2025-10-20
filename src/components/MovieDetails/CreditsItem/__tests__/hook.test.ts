import { renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import getSlug from 'src/utils/helpers/getSlug'

import useContainer from '../hook'
import { CreditsItemHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

jest.mock('src/utils/helpers/getSlug', () => jest.fn())

const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockGetSlug = getSlug as jest.MockedFunction<typeof getSlug>

describe('CreditsItem useContainer hook', () => {
  let mockNavigate: jest.Mock

  beforeEach(() => {
    mockNavigate = jest.fn()
    mockUseNavigate.mockReturnValue(mockNavigate as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return handleNavigateToPerson function', () => {
    const props: CreditsItemHookProps = {
      id: 1234,
      title: 'John Doe',
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.handleNavigateToPerson).toBeDefined()
    expect(typeof result.current.handleNavigateToPerson).toBe('function')
  })

  it('should navigate to person page with correct slug when handleNavigateToPerson is called', () => {
    const props: CreditsItemHookProps = {
      id: 1234,
      title: 'John Doe',
    }

    mockGetSlug.mockReturnValue('1234-john-doe')

    const { result } = renderHook(() => useContainer(props))

    result.current.handleNavigateToPerson()

    expect(mockGetSlug).toHaveBeenCalledWith(1234, 'John Doe')
    expect(mockNavigate).toHaveBeenCalledWith('/person/1234-john-doe')
  })

  it('should handle different id and title combinations', () => {
    const testCases = [
      { expectedSlug: '5678-jane-smith', id: 5678, title: 'Jane Smith' },
      { expectedSlug: '999-robert-johnson', id: 999, title: 'Robert Johnson' },
      { expectedSlug: '1-a', id: 1, title: 'A' },
    ]

    testCases.forEach(({ expectedSlug, id, title }) => {
      mockGetSlug.mockReturnValue(expectedSlug)

      const props: CreditsItemHookProps = { id, title }
      const { result } = renderHook(() => useContainer(props))

      result.current.handleNavigateToPerson()

      expect(mockGetSlug).toHaveBeenCalledWith(id, title)
      expect(mockNavigate).toHaveBeenCalledWith(`/person/${expectedSlug}`)
    })
  })

  it('should handle titles with special characters', () => {
    const props: CreditsItemHookProps = {
      id: 1234,
      title: 'José María García-López',
    }

    mockGetSlug.mockReturnValue('1234-jose-maria-garcia-lopez')

    const { result } = renderHook(() => useContainer(props))

    result.current.handleNavigateToPerson()

    expect(mockGetSlug).toHaveBeenCalledWith(1234, 'José María García-López')
    expect(mockNavigate).toHaveBeenCalledWith(
      '/person/1234-jose-maria-garcia-lopez'
    )
  })

  it('should handle titles with numbers and symbols', () => {
    const props: CreditsItemHookProps = {
      id: 9876,
      title: 'Actor 007: The Return!',
    }

    mockGetSlug.mockReturnValue('9876-actor-007-the-return')

    const { result } = renderHook(() => useContainer(props))

    result.current.handleNavigateToPerson()

    expect(mockGetSlug).toHaveBeenCalledWith(9876, 'Actor 007: The Return!')
    expect(mockNavigate).toHaveBeenCalledWith(
      '/person/9876-actor-007-the-return'
    )
  })

  it('should handle very long titles', () => {
    const longTitle =
      'A Very Long Actor Name That Goes On and On and Contains Many Words'
    const props: CreditsItemHookProps = {
      id: 5555,
      title: longTitle,
    }

    const expectedSlug =
      '5555-a-very-long-actor-name-that-goes-on-and-on-and-contains-many-words'
    mockGetSlug.mockReturnValue(expectedSlug)

    const { result } = renderHook(() => useContainer(props))

    result.current.handleNavigateToPerson()

    expect(mockGetSlug).toHaveBeenCalledWith(5555, longTitle)
    expect(mockNavigate).toHaveBeenCalledWith(`/person/${expectedSlug}`)
  })

  it('should handle empty title (edge case)', () => {
    const props: CreditsItemHookProps = {
      id: 1234,
      title: '',
    }

    mockGetSlug.mockReturnValue('1234-')

    const { result } = renderHook(() => useContainer(props))

    result.current.handleNavigateToPerson()

    expect(mockGetSlug).toHaveBeenCalledWith(1234, '')
    expect(mockNavigate).toHaveBeenCalledWith('/person/1234-')
  })

  it('should handle zero id', () => {
    const props: CreditsItemHookProps = {
      id: 0,
      title: 'Unknown Actor',
    }

    mockGetSlug.mockReturnValue('0-unknown-actor')

    const { result } = renderHook(() => useContainer(props))

    result.current.handleNavigateToPerson()

    expect(mockGetSlug).toHaveBeenCalledWith(0, 'Unknown Actor')
    expect(mockNavigate).toHaveBeenCalledWith('/person/0-unknown-actor')
  })

  it('should handle large id numbers', () => {
    const props: CreditsItemHookProps = {
      id: 999999999,
      title: 'Famous Actor',
    }

    mockGetSlug.mockReturnValue('999999999-famous-actor')

    const { result } = renderHook(() => useContainer(props))

    result.current.handleNavigateToPerson()

    expect(mockGetSlug).toHaveBeenCalledWith(999999999, 'Famous Actor')
    expect(mockNavigate).toHaveBeenCalledWith('/person/999999999-famous-actor')
  })

  it('should handle multiple calls to handleNavigateToPerson', () => {
    const props: CreditsItemHookProps = {
      id: 1234,
      title: 'John Doe',
    }

    mockGetSlug.mockReturnValue('1234-john-doe')

    const { result } = renderHook(() => useContainer(props))

    result.current.handleNavigateToPerson()
    result.current.handleNavigateToPerson()
    result.current.handleNavigateToPerson()

    expect(mockGetSlug).toHaveBeenCalledTimes(3)
    expect(mockNavigate).toHaveBeenCalledTimes(3)
    expect(mockNavigate).toHaveBeenNthCalledWith(1, '/person/1234-john-doe')
    expect(mockNavigate).toHaveBeenNthCalledWith(2, '/person/1234-john-doe')
    expect(mockNavigate).toHaveBeenNthCalledWith(3, '/person/1234-john-doe')
  })
})
