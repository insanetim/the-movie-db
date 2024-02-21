import { IMovieDetails } from 'src/interfaces/movie.interface'

export type CountriesProps = {
  countries: IMovieDetails['production_countries']
}

export type CountriesHookProps = CountriesProps

export type CountriesHookReturn = {
  formatedCountries: string
  title: string
}
