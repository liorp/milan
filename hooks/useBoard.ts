import { createContext, useContext } from 'react'
import { Board } from '../controllers/GameController'

export const BoardContext = createContext<Board>([])

export const useBoard = () => useContext(BoardContext)
