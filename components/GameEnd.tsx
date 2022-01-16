import React, { useCallback, useState } from 'react'
import {
    Board,
    emojiFromGuesses,
    numberOfRows,
} from '../controllers/GameController'
import { useWord } from '../hooks/useWord'
import ShareButton from './ShareButton'
import { useMountedState } from 'react-use'

const delay = 1100

export const GameEnd = ({
    won,
    lost,
    board,
    numberOfGuesses,
}: {
    won: boolean
    lost: boolean
    board: Board
    numberOfGuesses: number
}) => {
    const word = useWord()
    const [copied, setCopied] = useState(false)
    const isMounted = useMountedState()

    const onCopy = useCallback((text: string, success: boolean) => {
        success && setCopied(true)
        setTimeout(() => {
            if (isMounted) {
                setCopied(false)
            }
        }, delay)
    }, [])

    return (
        <div
            className={`mb-2 transition alert ${lost && 'alert-error'} ${
                won && 'alert-success'
            }`}
        >
            <div className="min-w-full flex items-center">
                <div className="flex-1">
                    {won && 'איזה כיף! '}
                    המילה הייתה {word}! {lost && 'איך לא ידעת כפרה?'}
                </div>
                <div className="flex-none mr-2">
                    <ShareButton
                        label="שיתוף"
                        title="גם אני נפלתי למילן"
                        text={`זה הלוח שלי
                        ${numberOfGuesses}/${numberOfRows}:\n
                        ${emojiFromGuesses(word, board)}\n`}
                        onClick={onCopy}
                    />
                </div>
            </div>
            <div
                className={`alert absolute z-10 top-0 left-[32vw] w-[36vw] transition ${
                    !copied && 'opacity-0'
                }`}
            >
                <div className="flex flex-1 justify-between">
                    <label>לוח הועתק!</label>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#2196f3"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}
