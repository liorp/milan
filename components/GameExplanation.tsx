import { useState, useEffect } from 'react'
import { LetterType } from '../controllers/GameController'
import { BoardCell } from './BoardCell'
import { DarkModeToggle } from './DarkModeToggle'
import { Milan } from './Milan'

export const GameExplanation = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            {isMounted ? (
                <div className="flex mt-2 items-center justify-between align-center mr-2">
                    <div className="flex items-center z-10">
                        <DarkModeToggle />
                        <a
                            href="#rules"
                            className="btn btn-outline text-sm leading-none"
                        >
                            חוקים
                        </a>
                    </div>
                    <div className="absolute left-0 top-0 text-center w-full flex justify-center">
                        <Milan />
                    </div>
                    <div id="rules" className="modal">
                        <div className="modal-box">
                            <div className="text-right z-[10000]">
                                טוב אז למי שלא בעניינים:
                                <br />
                                צריך לנחש את המילן ב-6 ניסיונות.
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
                                        className={`grid grid-cols-5 gap-1 w-5/8 lg:w-1/2 mt-4`}
                                    >
                                        {['ח', 'ל', 'ו', 'מ', 'י'].map(
                                            (l, j) => {
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
                                            }
                                        )}
                                    </div>
                                    ל נמצאת במילה במקום הנכון
                                    <br />
                                    <div
                                        className={`grid grid-cols-5 gap-1 w-5/8 lg:w-1/2 mt-4`}
                                    >
                                        {['ה', 'צ', 'ל', 'ח', 'ה'].map(
                                            (l, j) => {
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
                                            }
                                        )}
                                    </div>
                                    ח נמצאת במילה אבל לא במקום הנכון
                                    <br />
                                    <div
                                        className={`grid grid-cols-5 gap-1 w-5/8 lg:w-1/2 mt-4`}
                                    >
                                        {['מ', 'ס', 'י', 'ב', 'ה'].map(
                                            (l, j) => {
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
                                            }
                                        )}
                                    </div>
                                    י לא נמצאת במילה
                                </div>
                                <div className="divider mt-2 mb-0" />
                                יש מילן חדש כל יום!
                            </div>
                            <div className="mt-2 flex flex-row-reverse justify-between items-center">
                                <a href="#" className="btn btn-primary">
                                    קליל
                                </a>
                                <div
                                    className="flex flex-col tooltip tooltip-left"
                                    data-tip={
                                        'גרסה: ' +
                                        process.env.NEXT_PUBLIC_VERSION +
                                        ' קומיט: ' +
                                        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(
                                            -7
                                        )
                                    }
                                >
                                    <a
                                        href="https://liorp.dev"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline"
                                    >
                                        נוצר על ידי ליאור פולק
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center min-h-[3rem]" />
            )}
        </>
    )
}
