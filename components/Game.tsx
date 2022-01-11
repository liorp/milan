import React, { useRef, useState } from 'react'
import { InferGetStaticPropsType } from 'next'

import { useImmer } from 'use-immer'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import {
    numberOfRows,
    numberOfLetters,
    getCorrectAndPresent,
    letterToBgColor,
    wordInGuesses,
    Board,
    emojiFromGuesses,
    endOfWordToRegularLetters,
    regularToEndOfWordLetters,
} from '../controllers/GameController'
import ShareButton from './ShareButton'

export const Game = ({ word = 'לחמים' }: { word: string }) => {
    const [board, setBoard] = useImmer<Board>(
        Array(numberOfRows)
            .fill(0)
            .map(() => Array(numberOfLetters).fill(''))
    )
    const [finishRows, setFinishRows] = useImmer<boolean[]>(
        Array(numberOfRows).fill(false)
    )
    const [active, setActive] = useState(true)
    const flatLetters = board.flat()

    const currentPlace = flatLetters.findIndex((l) => l === '')
    const currentRow = Math.floor(currentPlace / numberOfLetters)
    const currentColumn = currentPlace % numberOfLetters
    const lost = !wordInGuesses(word, board) && finishRows[numberOfRows - 1]
    const won = wordInGuesses(word, board) && finishRows[currentRow - 1]
    const finishedGame = lost || won || currentPlace === -1

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

        if (letter === '{bksp}') {
            setBoard((l) => {
                l[currentRow][currentColumn - 1] = ''
            })
            return
        }
        if (letter !== '{enter}') {
            setBoard((l) => {
                l[currentRow][currentColumn] = letter
            })
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            {word}
            {finishedGame && (
                <div
                    className={`transition alert ${lost && 'alert-error'} ${
                        won && 'alert-success'
                    }`}
                >
                    <div className="flex-1">
                        <label className="mx-3">
                            {won && 'איזה כיף! '}
                            המילה הייתה {word}! {lost && 'איך לא ידעת כפרה?'}
                        </label>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-sm btn-ghost mr-2 font-bold">
                            <ShareButton
                                label="שיתוף"
                                title="גם אני נפלתי למילן"
                                text={`זה הלוח שלי: ${emojiFromGuesses(
                                    word,
                                    board
                                )}`}
                            />
                        </button>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-5 gap-1 place-content-center flex-grow">
                {board
                    .map((r, i) => {
                        const finishedRow = finishRows[i]
                        const correctAndPresent = getCorrectAndPresent(word, r)
                        return r.map((l, j) => {
                            const type = correctAndPresent[j]
                            return (
                                <span
                                    key={i * numberOfRows + j}
                                    className={`flex items-center justify-center text-xl font-bold text-center border-r-2 border-2 h-16 w-16 transition-colors duration-500 delay-[${
                                        j * 6000
                                    }ms] ${
                                        (finishedRow &&
                                            letterToBgColor[type]) ||
                                        'bg-gray-800'
                                    }`}
                                >
                                    {l}
                                </span>
                            )
                        })
                    })
                    .flat()}
            </div>
            <br />

            <div className="lg:w-5/12 lg:h-1/5">
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
