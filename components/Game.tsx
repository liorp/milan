import React, { useRef, useState } from 'react'
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
    letterTypeToBgColor,
} from '../controllers/GameController'
import { GameBoard } from './GameBoard'
import { GameEnd } from './GameEnd'
import { useWord } from '../hooks/useWord'

export const Game = () => {
    const word = useWord()
    const [board, setBoard] = useImmer<Board>(
        Array(numberOfRows)
            .fill(0)
            .map(() => Array(numberOfLetters).fill(''))
    )
    const [finishRows, setFinishRows] = useImmer<boolean[]>(
        Array(numberOfRows).fill(false)
    )
    const [active, setActive] = useState(true)
    const flatBoard = board.flat()

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

    const currentPlace = flatBoard.findIndex((l) => l === '')
    const currentRow = Math.floor(currentPlace / numberOfLetters)
    const currentColumn = currentPlace % numberOfLetters

    const finishedBoard = finishRows.every((e) => e === true)
    const lost = !wordInGuesses(word, board) && finishedBoard // Got to the end without guessing
    const won =
        wordInGuesses(word, board) &&
        (finishRows[currentRow - 1] || finishedBoard)
    const finishedGame = lost || won
    const numberOfGuesses = finishRows.lastIndexOf(true) + 1

    const keyboard = useRef()

    const onKeyPress = (button) => {
        let letter = button
        if (finishedGame || !active) return

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

        if (letter === '{bksp}') {
            if (currentColumn === 0 && !finishRows[currentRow - 1]) {
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
                setActive(false)
                setFinishRows((r) => {
                    r[currentPlace === -1 ? numberOfRows - 1 : currentRow - 1] =
                        true
                })
                setActive(true)
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
        <div className="w-full h-full flex-grow flex flex-col min-h-[14rem] items-center justify-between">
            {finishedGame && (
                <GameEnd
                    won={won}
                    lost={lost}
                    board={board}
                    numberOfGuesses={numberOfGuesses}
                />
            )}
            <GameBoard board={board} finishRows={finishRows} />
            <br />

            <div className="min-w-[22rem] min-h-[10rem] mb-2">
                <Keyboard
                    keyboardRef={(r) => (keyboard.current = r)}
                    theme="hg-theme-default hg-theme-ios hg-milan-theme"
                    layoutName="default"
                    layout={{
                        default: [
                            ' פ ם ן ו ט א ר ק ',
                            ' ף ך ל ח י ע כ ג ד ש ',
                            '{bksp} ץ ת צ מ נ ה ב ס ז {enter}',
                        ],
                    }}
                    buttonTheme={[
                        {
                            class: 'invisible',
                            buttons: ' ',
                        },
                        {
                            class: letterTypeToBgColor[LetterType.Unevaluated],
                            buttons: keys[LetterType.Unevaluated].join(' '),
                        },
                        {
                            class: letterTypeToBgColor[LetterType.Miss],
                            buttons: keys[LetterType.Miss].join(' '),
                        },
                        {
                            class: letterTypeToBgColor[LetterType.Present],
                            buttons: keys[LetterType.Present].join(' '),
                        },
                        {
                            class: letterTypeToBgColor[LetterType.Correct],
                            buttons: keys[LetterType.Correct].join(' '),
                        },
                    ]}
                    display={{ '{bksp}': '⌫', '{enter}': 'יאללה' }}
                    disableButtonHold
                    onKeyPress={onKeyPress}
                    physicalKeyboardHighlight={!finishedGame}
                    physicalKeyboardHighlightPress={!finishedGame}
                />
            </div>
        </div>
    )
}
