import { LetterType, letterTypeToBgColor } from '../controllers/GameController'

export const BoardCell = ({
    letter,
    finishedRow,
    type,
    column,
    shake,
}: {
    letter: string
    finishedRow: boolean
    type: LetterType
    column: number
    shake: boolean
}) => {
    return (
        <span
            className={`flex items-center justify-center 
            text-xl font-bold text-center 
            border-gray-700 dark:border-gray-300 border-r-2 border-2 
            h-10 w-10 transition-colors duration-500 ${
                finishedRow && letterTypeToBgColor[type]
            } ${shake && 'shake'}`}
            style={{ transitionDelay: column * 70 + 'ms' }}
        >
            {letter}
        </span>
    )
}
