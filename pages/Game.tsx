import React, { useRef, useState } from 'react'
import { useImmer } from 'use-immer'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import {
    numberOfRows,
    numberOfLetters,
    getCorrectAndPresent,
    word,
    letterToBgColor,
    wordInGuesses,
    Board,
    generateEmojiFromGuesses,
} from './GameController'
import ShareButton from './ShareButton'

export const Game = () => {
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
    const lost =
        currentPlace === numberOfLetters * numberOfRows &&
        !wordInGuesses(word, board)
    const won = wordInGuesses(word, board) && finishRows[currentRow - 1]
    const finishedGame = lost || won

    const keyboard = useRef()

    const onKeyPress = (button) => {
        if (finishedGame || !active) return

        // Waiting for next row
        if (
            currentColumn === 0 &&
            currentRow > 0 &&
            !finishRows[currentRow - 1]
        ) {
            if (button === '{enter}') {
                setActive(false)
                setFinishRows((r) => {
                    r[currentRow - 1] = true
                })
                setActive(true)
            }
            return
        }

        if (button === '{bksp}') {
            setBoard((l) => {
                l[currentRow][currentColumn - 1] = ''
            })
            return
        }
        if (button !== '{enter}') {
            setBoard((l) => {
                l[currentRow][currentColumn] = button
            })
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            {finishedGame && (
                <div
                    className={`transition alert ${lost && 'alert-error'} ${
                        won && 'alert-success'
                    }`}
                >
                    <div className="flex-1">
                        <label className="mx-3">
                            {won && 'איזה כיף! '}
                            המילה הייתה {word}!{lost && 'איך לא ידעת כפרה?'}
                        </label>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-sm btn-ghost mr-2 font-bold">
                            <ShareButton
                                label="שיתוף"
                                title="גם אני נפלתי למילן"
                                text={`זה הלוח שלי: ${generateEmojiFromGuesses(
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
                        const correctAndPresent = getCorrectAndPresent(
                            word,
                            r
                        )
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
                    physicalKeyboardHighlight
                    physicalKeyboardHighlightPress
                />
            </div>
        </div>
    )
}
