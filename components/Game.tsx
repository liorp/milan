import React, { useState } from 'react'
import { useImmer } from 'use-immer'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import {
    numberOfRows,
    numberOfLetters,
    wordInGuesses,
    Board,
    endOfWordToRegularLetters,
    regularToEndOfWordLetters,
    keyboardLettersFromGuesses,
    LetterType,
} from '../controllers/GameController'
import { GameBoard } from './GameBoard'
import { GameEnd } from './GameEnd'
import { useWord } from '../hooks/useWord'
import axios from 'axios'
import { createConfetti, delay } from '../lib/utils'
import { WordNotInDictionary } from './WordNotInDictionary'
import { getCoordinates, generateButtonTheme } from '../lib/utils'

export const Game = ({
    checkWordAgainstDictionary = true,
}: {
    checkWordAgainstDictionary?: boolean
}) => {
    const word = useWord()
    const [board, setBoard] = useImmer<Board>(
        Array(numberOfRows)
            .fill(0)
            .map(() => Array(numberOfLetters).fill(''))
    )
    const [finishRows, setFinishRows] = useImmer<boolean[]>(
        Array(numberOfRows).fill(false)
    )
    const [wordNotInList, setWordNotInList] = useState('')
    const [shakeRow, setShakeRow] = useState<number>()

    const keymap = keyboardLettersFromGuesses(
        word,
        board.slice(
            0,
            finishRows.lastIndexOf(true) > -1
                ? finishRows.lastIndexOf(true) + 1
                : 0
        )
    )
    const keys = {
        [LetterType.Unevaluated]: [],
        [LetterType.Miss]: [],
        [LetterType.Present]: [],
        [LetterType.Correct]: [],
    }
    for (const c in keymap) {
        keys[keymap[c]].push(c)
        if (c in regularToEndOfWordLetters) {
            keys[keymap[c]].push(regularToEndOfWordLetters[c])
        }
        if (c in endOfWordToRegularLetters) {
            keys[keymap[c]].push(endOfWordToRegularLetters[c])
        }
    }

    const { currentPlace, currentRow, currentColumn } = getCoordinates(board)

    const finishedBoard = finishRows.every((e) => e === true)
    const lost = !wordInGuesses(word, board) && finishedBoard // Got to the end without guessing
    const won =
        wordInGuesses(word, board) &&
        (finishRows[currentRow - 1] || finishedBoard)
    const finishedGame = lost || won
    const numberOfGuesses = finishRows.lastIndexOf(true) + 1

    const onKeyPress = async (button) => {
        let letter = button
        if (finishedGame) return

        if (
            letter in endOfWordToRegularLetters &&
            currentColumn !== numberOfLetters - 1
        ) {
            letter = endOfWordToRegularLetters[letter]
        }
        if (
            letter in regularToEndOfWordLetters &&
            currentColumn === numberOfLetters - 1
        ) {
            letter = regularToEndOfWordLetters[letter]
        }

        if (letter === '{backspace}') {
            if (currentPlace === 0) {
                // Some people think it's funny to delete the first letter
                return
            } else if (currentColumn === 0 && !finishRows[currentRow - 1]) {
                // Got to the next line without finishing on the previous
                setBoard((l) => {
                    l[currentRow - 1][numberOfLetters - 1] = ''
                })
            } else if (currentPlace === -1) {
                // Got to the end without finishing on the previous
                setBoard((l) => {
                    l[numberOfRows - 1][numberOfLetters - 1] = ''
                })
            } else {
                setBoard((l) => {
                    l[currentRow][currentColumn - 1] = ''
                })
            }
            return
        }

        // Waiting for next row
        if (
            (currentColumn === 0 &&
                currentRow > 0 &&
                !finishRows[currentRow - 1]) ||
            currentPlace === -1
        ) {
            if (letter === '{enter}') {
                const row =
                    currentPlace === -1 ? numberOfRows - 1 : currentRow - 1
                const candidate = board[row].join('')
                if (candidate === 'ליאור') createConfetti()
                if (checkWordAgainstDictionary) {
                    const { data } = await axios.get(
                        '/api/words?word=' + candidate
                    )
                    if (!data?.found) {
                        setWordNotInList(candidate)
                        setShakeRow(row)
                        await delay(2)
                        setWordNotInList('')
                        setShakeRow(undefined)
                        return
                    }
                }
                setFinishRows((r) => {
                    r[row] = true
                })
            }
            return
        }

        if (letter !== '{enter}') {
            setBoard((l) => {
                l[currentRow][currentColumn] = letter
            })
        }
    }

    return (
        <div className="w-[100vw] h-full flex-grow flex flex-col min-h-[14rem] items-center justify-between">
            {finishedGame && (
                <GameEnd
                    won={won}
                    lost={lost}
                    board={board}
                    numberOfGuesses={numberOfGuesses}
                />
            )}
            {wordNotInList && <WordNotInDictionary word={wordNotInList} />}
            <GameBoard
                board={board}
                finishRows={finishRows}
                shakeRow={shakeRow}
            />
            <br />

            <div className="min-w-[22rem] min-h-[10rem] mb-2">
                <Keyboard
                    theme="hg-theme-default hg-theme-ios hg-milan-theme"
                    layoutName="default"
                    layout={{
                        default: [
                            ' פ ם ן ו ט א ר ק ',
                            ' ף ך ל ח י ע כ ג ד ש ',
                            '{backspace} ץ ת צ מ נ ה ב ס ז {enter}',
                        ],
                    }}
                    buttonTheme={[
                        {
                            class: 'invisible',
                            buttons: ' ',
                        },
                        ...generateButtonTheme(keys),
                    ]}
                    display={{ '{backspace}': '⌫', '{enter}': 'יאללה' }}
                    disableButtonHold
                    onKeyPress={onKeyPress}
                    physicalKeyboardHighlight={!finishedGame}
                    physicalKeyboardHighlightPress={!finishedGame}
                />
            </div>
        </div>
    )
}
