import { ChangeEventHandler } from 'react'
import { Query } from 'src/interfaces/global.interface'

export type SearchInputProps = {
  query: Query
}

export type SearchInputHookProps = {
  query: Query
}

export type SearchInputHook = {
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleSearch: (value: string) => void
  inputValue: string
}
