import { createContext, useContext } from 'react'

export const LogoContext = createContext('')

export const useLogo = () => useContext(LogoContext)
