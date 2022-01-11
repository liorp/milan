import React from 'react'
import { Board, emojiFromGuesses } from '../controllers/GameController'
import ShareButton from './ShareButton'

export const GameEnd = ({
    won,
    lost,
    word,
    board,
}: {
    won: boolean
    lost: boolean
    word: string
    board: Board
}) => {
    return (
        <div
            className={`mb-2 transition alert ${lost && 'alert-error'} ${
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
                        text={`זה הלוח שלי: ${emojiFromGuesses(word, board)}`}
                    />
                </button>
            </div>
        </div>
    )
}
