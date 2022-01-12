import React from 'react'
import { LetterType, letterTypeToBgColor } from '../controllers/GameController'

export const BoardCell = ({
    letter,
    finishedRow,
    type,
    column,
}: {
    letter: string
    finishedRow: boolean
    type: LetterType
    column: number
}) => {
    return (
        <span
            className={`flex items-center justify-center text-xl font-bold text-center border-gray-700 dark:border-gray-300 border-r-2 border-2 h-10 w-10 transition-colors duration-500 delay-[${
                column * 1000
            }ms] ${finishedRow && letterTypeToBgColor[type]}`}
        >
            {letter}
        </span>
    )
}
