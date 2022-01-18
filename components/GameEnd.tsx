import React, { useCallback, useState } from 'react'
import {
    Board,
    emojiFromGuesses,
    numberOfRows,
} from '../controllers/GameController'
import { useWord } from '../hooks/useWord'
import ShareButton from './ShareButton'
import { useMountedState } from 'react-use'
import { DateTime } from 'luxon'

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
                        label="&lrm;שיתוף"
                        title={'\u200Eגם אני נפלתי למילן'}
                        text={
                            '\u200Eזה הלוח שלי' +
                            ' ' +
                            DateTime.now().toFormat('dd/MM/yyyy') +
                            ' ' +
                            numberOfGuesses +
                            '/' +
                            numberOfRows +
                            ':\n' +
                            emojiFromGuesses(word, board)
                        }
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
                </div>
            </div>
        </div>
    )
}
