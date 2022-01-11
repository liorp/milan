import React, { useRef, useState } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const numberOfLetters = 5
const numberOfRows = 5
const words = ['לחמים']

export const Game = () => {
    const [currentSequence, setCurrentSequence] = useState('')
    const [letters, setLetters] = useState<string[][]>(
        new Array(5).fill('').map(() => new Array(numberOfLetters).fill(''))
    )
    const flatLetters = letters.flat()
    const activeRow = Math.floor(
        flatLetters.findIndex((l) => l !== '') / numberOfLetters
    )
    const activeColumn =
        flatLetters.findIndex((l) => l !== '') % numberOfLetters
    const activePlace = flatLetters.findIndex((l) => l === '') - 1
    const keyboard = useRef()

    const onKeyPress = (button) => {
        if (activePlace === numberOfLetters * numberOfRows - 1) return
        const nextPlace = activePlace + 1
        const nextRow = Math.floor(nextPlace / numberOfLetters)
        const nextColumn = nextPlace % numberOfLetters
        if (button === '{bksp}') {
            setLetters((l) => {
                l[activeRow][activeColumn] = ''
                return l
            })
            setCurrentSequence((s) => s.slice(0, -1))
        }
        setLetters((l) => {
            l[nextRow][nextColumn] = button
            return l
        })
        setCurrentSequence((s) => s + button)
        if (currentSequence.length === 5) {
            setCurrentSequence('')
        }
    }

    return (
        <>
            <div className="grid grid-cols-5 gap-5">
                {Array(25)
                    .fill(0)
                    .map((_, i) => (
                        <span
                            className="border border-r-2 border-gray-400 h-10 w-10"
                            key={i}
                        >
                            {flatLetters[i]}
                        </span>
                    ))}
            </div>
            <br />

            <Keyboard
                keyboardRef={(r) => (keyboard.current = r)}
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
                onKeyPress={onKeyPress}
                physicalKeyboardHighlight
                physicalKeyboardHighlightPress
            />
        </>
    )
}
