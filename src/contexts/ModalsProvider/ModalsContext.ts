import { createContext, useContext } from 'react'

import { ModalsContextType } from './types'

export const ModalsContext = createContext<ModalsContextType | undefined>(
  undefined
)

export const useModalsContext = () => {
  const context = useContext(ModalsContext)

  if (!context) {
    throw new Error('useModalsContext must be used within a ModalsProvider')
  }

  return context
}
