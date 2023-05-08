export interface SearchInputProps {
  query: string
}

export interface SearchInputHookProps extends SearchInputProps {}

export interface SearchInputHook {
  currentValue: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearch: (value: string) => void
}
