import React from 'react'

export const WordNotInDictionary = ({ word }: { word: string }) => {
    return (
        <div
            className={`alert alert-error absolute z-10 top-20 left-[40vw] w-[20vw]`}
        >
            <div className="flex flex-1 justify-between">
                <label>מה זה {word}? זה לא ברשימות שלי 😢</label>
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
    )
}
