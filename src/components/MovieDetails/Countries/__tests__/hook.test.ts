import { renderHook } from '@testing-library/react'

import useContainer from '../hook'
import { CountriesHookProps } from '../types'

// Mock country data for testing
const mockCountries = [
  { iso_3166_1: 'US', name: 'United States of America' },
  { iso_3166_1: 'GB', name: 'United Kingdom' },
  { iso_3166_1: 'CA', name: 'Canada' },
]

const singleCountry = [{ iso_3166_1: 'US', name: 'United States of America' }]

const emptyCountries: typeof mockCountries = []

describe('Countries useContainer hook', () => {
  it('should return formatted countries and pluralized title for multiple countries', () => {
    const props: CountriesHookProps = {
      countries: mockCountries,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.formattedCountries).toBe(
      'United States of America, United Kingdom, Canada'
    )
    expect(result.current.pluralizedTitle).toBe('Countries')
  })

  it('should return formatted countries and singular title for single country', () => {
    const props: CountriesHookProps = {
      countries: singleCountry,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.formattedCountries).toBe('United States of America')
    expect(result.current.pluralizedTitle).toBe('Country')
  })

  it('should handle empty countries array', () => {
    const props: CountriesHookProps = {
      countries: emptyCountries,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.formattedCountries).toBe('')
    expect(result.current.pluralizedTitle).toBe('Country')
  })

  it('should handle countries with special characters in names', () => {
    const countriesWithSpecialChars = [
      { iso_3166_1: 'FR', name: 'France (European Union)' },
      { iso_3166_1: 'DE', name: 'Deutschland' },
    ]

    const props: CountriesHookProps = {
      countries: countriesWithSpecialChars,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.formattedCountries).toBe(
      'France (European Union), Deutschland'
    )
    expect(result.current.pluralizedTitle).toBe('Countries')
  })

  it('should handle single character country names', () => {
    const shortNameCountries = [
      { iso_3166_1: 'US', name: 'US' },
      { iso_3166_1: 'UK', name: 'UK' },
    ]

    const props: CountriesHookProps = {
      countries: shortNameCountries,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.formattedCountries).toBe('US, UK')
    expect(result.current.pluralizedTitle).toBe('Countries')
  })

  it('should handle large number of countries', () => {
    const manyCountries = Array.from({ length: 10 }, (_, i) => ({
      iso_3166_1: `C${i}`,
      name: `Country ${i}`,
    }))

    const props: CountriesHookProps = {
      countries: manyCountries,
    }

    const { result } = renderHook(() => useContainer(props))

    const expectedFormatted = manyCountries.map(c => c.name).join(', ')
    expect(result.current.formattedCountries).toBe(expectedFormatted)
    expect(result.current.pluralizedTitle).toBe('Countries')
  })

  it('should handle countries with empty names (edge case)', () => {
    const countriesWithEmptyNames = [
      { iso_3166_1: 'US', name: '' },
      { iso_3166_1: 'GB', name: 'United Kingdom' },
    ]

    const props: CountriesHookProps = {
      countries: countriesWithEmptyNames,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.formattedCountries).toBe(', United Kingdom')
    expect(result.current.pluralizedTitle).toBe('Countries')
  })

  it('should return correct values for exactly two countries', () => {
    const twoCountries = [
      { iso_3166_1: 'US', name: 'United States' },
      { iso_3166_1: 'CA', name: 'Canada' },
    ]

    const props: CountriesHookProps = {
      countries: twoCountries,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.formattedCountries).toBe('United States, Canada')
    expect(result.current.pluralizedTitle).toBe('Countries')
  })
})
