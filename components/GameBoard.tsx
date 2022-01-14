import React from 'react'
import { Board } from '../controllers/GameController'
import { useWord } from '../hooks/useWord'
import { BoardCell } from './BoardCell'
import { BoardRow } from './BoardRow'

export const GameBoard = ({
    board,
    finishRows,
}: {
    board: Board
    finishRows: boolean[]
}) => {
    const word = useWord()

    return (
        <div
            className={`grid grid-cols-${word.length} gap-1 place-content-center flex-grow`}
        >
            {board.map((r, i) => {
                return (
                    <BoardRow
                        key={i}
                        finishRows={finishRows}
                        rowIndex={i}
                        row={r}
                    />
                )
            })}
        </div>
    )
}
