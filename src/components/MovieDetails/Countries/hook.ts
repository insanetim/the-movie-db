import { CountriesHookProps, CountriesHookReturn } from './types'

const useContainer = ({
  countries,
}: CountriesHookProps): CountriesHookReturn => {
  const title = countries.length > 1 ? 'Countries' : 'Country'
  const formatedCountries = countries.map(country => country.name).join(', ')

  return { formatedCountries, title }
}

export default useContainer
