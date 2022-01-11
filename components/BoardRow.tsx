import React from 'react'
import {
    getCorrectAndPresent,
    numberOfRows,
} from '../controllers/GameController'
import { useWord } from '../hooks/useWord'
import { BoardCell } from './BoardCell'

export const BoardRow = ({
    finishRows,
    rowIndex,
    row,
}: {
    finishRows: boolean[]
    rowIndex: number
    row: string[]
}) => {
    const word = useWord()

    const finishedRow = finishRows[rowIndex]
    const correctAndPresent = getCorrectAndPresent(word, row)
    return (
        <>
            {row.map((l, j) => {
                const type = correctAndPresent[j]
                return (
                    <BoardCell
                        key={rowIndex * numberOfRows + j}
                        letter={l}
                        finishedRow={finishedRow}
                        type={type}
                        column={j}
                    />
                )
            })}
        </>
    )
}
