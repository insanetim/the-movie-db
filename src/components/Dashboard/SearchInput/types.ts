export interface SearchInputProps {
  query: string
}

export interface SearchInputHook {
  handleSearch: (value: string) => void
}
