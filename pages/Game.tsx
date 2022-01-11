import React, { useRef, useState } from 'react'
import { useImmer } from 'use-immer'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const numberOfLetters = 5
const numberOfRows = 6
const word = 'לחמים'

export const Game = () => {
    const [letters, setLetters] = useImmer<string[][]>(
        Array(numberOfRows)
            .fill(0)
            .map(() => Array(numberOfLetters).fill(''))
    )
    const [finishRows, setFinishRows] = useImmer<boolean[]>(
        Array(numberOfRows).fill(false)
    )
    const [active, setActive] = useState(true)
    const flatLetters = letters.flat()

    const currentPlace = flatLetters.findIndex((l) => l === '')
    const currentRow = Math.floor(currentPlace / numberOfLetters)
    const currentColumn = currentPlace % numberOfLetters

    const keyboard = useRef()

    const onKeyPress = (button) => {
        if (!active) {
            return
        }
        // Game ended
        if (currentPlace === numberOfLetters * numberOfRows) return

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
            setLetters((l) => {
                l[currentRow][currentColumn - 1] = ''
            })
            return
        }
        setLetters((l) => {
            l[currentRow][currentColumn] = button
        })
    }

    return (
        <>
            <div className="grid grid-cols-5 gap-5">
                {letters
                    .map((r, i) => {
                        const finishedRow = finishRows[i]
                        console.log(finishedRow)
                        return r.map((l, j) => {
                            const bul = word[j] == l
                            const hit = l !== '' && word.indexOf(l) !== -1
                            console.log('word' + word + 'le' + l + hit + bul)
                            return (
                                <span
                                    key={i * numberOfRows + j}
                                    className={`border border-r-2 border-gray-400 h-10 w-10 transition-colors duration-500 delay-[${
                                        j * 6000
                                    }ms] ${
                                        finishedRow &&
                                        ((bul && 'bg-green-400') ||
                                            (hit && 'bg-orange-400'))
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

            <Keyboard
                keyboardRef={(r) => (keyboard.current = r)}
                theme="hg-theme-default hg-theme-ios"
                layoutName={'default'}
                layout={{
                    default: [
                        ' ק ר א ט ו ן ם פ ',
                        ' ש ד ג כ ע י ח ל ך ף ',
                        '{bksp} ז ס ב ה נ מ צ ת ץ {enter}',
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
        </>
    )
}
