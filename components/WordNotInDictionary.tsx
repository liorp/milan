import React from 'react'

export const WordNotInDictionary = ({ word }: { word: string }) => {
    return (
        <div
            className={`alert alert-error absolute bg-opacity-95 font-bold text-center text-red-900 z-10 top-3 left-[24vw] w-[52vw]`}
        >
            <div className="flex flex-1 justify-between">
                <label>
                    מה זה {word}?<br />
                    זה לא ברשימות שלי 😢
                </label>
            </div>
        </div>
    )
}
