export type CreditsItemHookProps = {
  id: number
  title: string
}

export type CreditsItemHookReturn = {
  handleNavigateToPerson: () => void
}

export type CreditsItemProps = {
  description?: string
  id: number
  profilePath?: string
  title: string
}
