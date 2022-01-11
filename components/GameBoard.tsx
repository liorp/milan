import React from 'react'
import {
    Board,
    getCorrectAndPresent,
    letterTypeToBgColor,
    numberOfRows,
} from '../controllers/GameController'

export const GameBoard = ({
    board,
    finishRows,
    word,
}: {
    board: Board
    finishRows: boolean[]
    word: string
}) => {
    return (
        <div className="grid grid-cols-5 gap-1 place-content-center flex-grow">
            {board
                .map((r, i) => {
                    const finishedRow = finishRows[i]
                    const correctAndPresent = getCorrectAndPresent(word, r)
                    console.log(correctAndPresent)
                    return r.map((l, j) => {
                        const type = correctAndPresent[j]
                        return (
                            <span
                                key={i * numberOfRows + j}
                                className={`flex items-center justify-center text-xl font-bold text-center border-r-2 border-2 h-16 w-16 transition-colors duration-500 delay-[${
                                    j * 1000
                                }ms] ${
                                    finishedRow && letterTypeToBgColor[type]
                                }`}
                            >
                                {l}
                            </span>
                        )
                    })
                })
                .flat()}
        </div>
    )
}
