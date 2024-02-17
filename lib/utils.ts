import confetti from 'canvas-confetti'
import {
    LetterType,
    letterTypeToBgColor,
    Board,
    numberOfLetters,
} from '../controllers/GameController'

export const delay = (seconds: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000)
    })
export const generateButtonTheme = (keys: Record<LetterType, string[]>) => {
    let buttons = []
    for (const letterType of Object.values(LetterType)) {
        if (keys[letterType]?.length) {
            const button = {
                class: letterTypeToBgColor[letterType],
                buttons: keys[letterType].join(' '),
            }
            buttons.push(button)
        }
    }
    return buttons
}

export const getCoordinates = (
    board: Board
): { currentPlace: number; currentRow: number; currentColumn: number } => {
    const flatBoard = board.flat()
    const currentPlace = flatBoard.findIndex((l) => l === '')
    const currentRow = Math.floor(currentPlace / numberOfLetters)
    const currentColumn = currentPlace % numberOfLetters
    return {
        currentPlace,
        currentRow,
        currentColumn,
    }
}
const duration = 4 * 1000
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
const shapes = [
    '💻',
    '🖥️',
    '🎧',
    '🕹️',
    '👾',
    '🎮',
    '👽',
    '🚀',
    '🛸',
    '👓',
    '🔌',
    '💾',
    '📀',
    '💿',
    '📱',
    '🔭',
    '🔬',
    '🖱️',
    '⌨️',
    '🎛️',
    '📷',
    '🎥',
    '🔋',
    '🔌',
    '💡',
    '🔦',
    '🕯️',
    '🔧',
    '🔨',
    '🛠️',
    '🧲',
    '🧪',
    '🧫',
    '🧬',
    '💉',
    '🧪',
    '🌡️',
    '🧬',
    '🦠',
    '🧫',
    '🧪',
    '🔬',
    '🔭',
    '📡',
    '🚀',
    '🛰️',
    '🌍',
    '🌎',
    '🌏',
    '🪐',
    '💫',
    '⭐',
    '🌟',
    '🔥',
    '💥',
]

const randomInRange = (min, max) => Math.random() * (max - min) + min

export const createConfetti = () => {
    const animationEnd = Date.now() + duration

    function frame() {
        const now = Date.now()
        const timeLeft = animationEnd - now

        if (timeLeft <= 0) {
            return
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({
            ...defaults,
            particleCount,
            shapes: shapes.map((s) =>
                confetti.shapeFromText({ text: s, scalar: 5 })
            ),
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
            ...defaults,
            particleCount,
            shapes: shapes.map((s) =>
                confetti.shapeFromText({ text: s, scalar: 5 })
            ),
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })

        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}
