import React, { useRef, useState } from 'react'
import { produce } from 'immer'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const numberOfLetters = 5
const numberOfRows = 5
const words = ['לחמים']
const word = 'לחמים'

export const Game = () => {
    const [letters, setLetters] = useState(
        Array(numberOfRows)
            .fill(0)
            .map(() => Array(numberOfLetters).fill(''))
    )
    const [finishRow, setFinishRow] = useState(false)
    const flatLetters = letters.flat()

    const currentPlace = flatLetters.findIndex((l) => l === '')
    const currentRow = Math.floor(currentPlace / numberOfLetters)
    const currentColumn = currentPlace % numberOfLetters

    const keyboard = useRef()

    const onKeyPress = (button) => {
        // Game ended
        if (currentPlace === numberOfLetters * numberOfRows) return

        // Waiting for next row
        if (currentColumn === numberOfLetters) {
            if (button !== '{enter}') return
            setFinishRow(true)
        }

        if (button === '{bksp}') {
            setLetters((l) => {
                return produce(l, (draft) => {
                    draft[currentRow][currentColumn] = ''
                })
            })
        }
        setLetters((l) => {
            return produce(l, (draft) => {
                draft[currentRow][currentColumn] = button
            })
        })
    }

    return (
        <>
            <div className="grid grid-cols-5 gap-5">
                {letters
                    .map((r, i) =>
                        r.map((l, j) => (
                            <span
                                key={i * numberOfRows + j}
                                className="border border-r-2 border-gray-400 h-10 w-10"
                            >
                                {l}
                            </span>
                        ))
                    )
                    .flat()}
                {JSON.stringify(letters)}
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
