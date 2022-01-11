import React from 'react'
import { LetterType } from '../controllers/GameController'
import { BoardCell } from './BoardCell'
import { Milan } from './Milan'

export const GameExplanation = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="w-1/3" />
                <Milan />
                <div className="w-1/3">
                    <a
                        href="#rules"
                        className="btn btn-primary text-sm leading-none h-6"
                    >
                        חוקים
                    </a>
                </div>
            </div>
            <div id="rules" className="modal">
                <div className="modal-box">
                    <p className="text-right">
                        טוב אז למי שלא מכיר צריך לנחש את המילן ב-6 ניסיונות.
                        <br />
                        כל ניחוש זה 5 אותיות.
                        <br />
                        לוחצים על יאללה כדי לנקד את המילה.
                        <br />
                        אחרי כל ניקוד, הצבע של האות משתנה.
                        <div className="divider mt-0 mb-0" />
                        <h2 className="mt-0 min-h-fit leading-loose w-max text-xl font-bold">
                            הדגמות
                        </h2>
                        <div className="flex flex-col justify-center items-start">
                            <div
                                className={`grid grid-cols-5 gap-1 w-5/8 lg:w-1/2 mt-2`}
                            >
                                {['ח', 'ל', 'ו', 'מ', 'י'].map((l, j) => {
                                    const type =
                                        j === 1
                                            ? LetterType.Correct
                                            : LetterType.Unevaluated
                                    return (
                                        <BoardCell
                                            key={j}
                                            letter={l}
                                            finishedRow={true}
                                            type={type}
                                            column={j}
                                        />
                                    )
                                })}
                            </div>
                            ל נמצאת במילה במקום הנכון
                            <br />
                            <div
                                className={`grid grid-cols-5 gap-1 w-5/8 lg:w-1/2 mt-2`}
                            >
                                {['ה', 'צ', 'ל', 'ח', 'ה'].map((l, j) => {
                                    const type =
                                        j === 3
                                            ? LetterType.Present
                                            : LetterType.Unevaluated
                                    return (
                                        <BoardCell
                                            key={j}
                                            letter={l}
                                            finishedRow={true}
                                            type={type}
                                            column={j}
                                        />
                                    )
                                })}
                            </div>
                            ח נמצאת במילה אבל לא במקום הנכון
                            <br />
                            <div
                                className={`grid grid-cols-5 gap-1 w-5/8 lg:w-1/2 mt-2`}
                            >
                                {['מ', 'ס', 'י', 'ב', 'ה'].map((l, j) => {
                                    const type =
                                        j === 2
                                            ? LetterType.Miss
                                            : LetterType.Unevaluated
                                    return (
                                        <BoardCell
                                            key={j}
                                            letter={l}
                                            finishedRow={true}
                                            type={type}
                                            column={j}
                                        />
                                    )
                                })}
                            </div>
                            י לא נמצאת במילה
                        </div>
                        <div className="divider mt-0 mb-0" />
                        יש מילן חדש כל יום!
                    </p>
                    <div className="modal-action">
                        <a href="#" className="btn btn-primary">
                            קליל
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}