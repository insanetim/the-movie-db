import { IMovieDetails } from 'src/interfaces/movie.interface'

export type CountriesHookProps = CountriesProps

export type CountriesHookReturn = {
  formattedCountries: string
  pluralizedTitle: string
}

export type CountriesProps = {
  countries: IMovieDetails['production_countries']
}
