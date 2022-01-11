import { createContext, useContext } from 'react'

export const WordContext = createContext('')

export const useWord = () => useContext(WordContext)
