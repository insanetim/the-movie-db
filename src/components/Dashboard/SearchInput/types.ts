import { ChangeEvent } from 'react'

export interface SearchInputProps {
  query: string
}

export interface SearchInputHookProps {
  query: string
}

export interface SearchInputHook {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSearch: (value: string) => void
  inputValue: string
}
