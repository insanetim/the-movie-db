import { CountriesHookProps, CountriesHookReturn } from './types'

const useContainer = ({
  countries,
}: CountriesHookProps): CountriesHookReturn => {
  const pluralizedTitle = countries.length > 1 ? 'Countries' : 'Country'
  const formattedCountries = countries.map(({ name }) => name).join(', ')

  return { formattedCountries, pluralizedTitle }
}

export default useContainer
