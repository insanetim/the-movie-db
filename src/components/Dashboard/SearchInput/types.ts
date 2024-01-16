import { ChangeEventHandler } from 'react'
import { Query } from 'src/interfaces/global.interface'

export type SearchInputProps = {
  query: Query
}

export type SearchInputHookProps = {
  query: Query
}

export type SearchInputHookReturn = {
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleSearch: (value: string) => void
  inputValue: string
}
