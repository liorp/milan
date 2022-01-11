export type Board = string[][]
export const numberOfLetters = 5
export const numberOfRows = 6
export const word = 'לחמים'

export const endOfWordToRegularLetters = {
    ם: 'מ',
    ן: 'נ',
    ץ: 'צ',
    ף: 'פ',
    ך: 'כ',
}

export const regularToEndOfWordLetters = {
    מ: 'ם',
    נ: 'ן',
    צ: 'ץ',
    פ: 'ף',
    כ: 'ך',
}

export enum Letter {
    Present,
    Correct,
    Miss,
}

export const letterToBgColor = {
    [Letter.Miss]: 'bg-grey-400',
    [Letter.Present]: 'bg-orange-400',
    [Letter.Correct]: 'bg-green-400',
}

export const letterToEmoji = {
    [Letter.Present]: '🟨',
    [Letter.Correct]: '🟩',
    [Letter.Miss]: '⬛',
}

export const keyboardLettersFromGuesses = (word: string, guesses: Board) => {
    let letters = {
        א: '',
        ב: '',
        ג: '',
        ד: '',
        ה: '',
        ו: '',
        ז: '',
        ח: '',
        ט: '',
        י: '',
        כ: '',
        ל: '',
        מ: '',
        נ: '',
        ס: '',
        ע: '',
        פ: '',
        צ: '',
        ק: '',
        ר: '',
        ש: '',
        ת: '',
    }
    let content = []
    for (let i = 0; i < guesses.length; i++) {
        content.push(
            getCorrectAndPresent(word, guesses[i])
                .map((l) => letterToEmoji[l])
                .join('')
        )
    }
    return content.join('\n')
}

export const emojiFromGuesses = (word: string, guesses: Board): string => {
    let content = []
    for (let i = 0; i < guesses.length; i++) {
        content.push(
            getCorrectAndPresent(word, guesses[i])
                .map((l) => letterToEmoji[l])
                .join('')
        )
    }
    return content.join('\n')
}

export const wordInGuesses = (word: string, guesses: Board): boolean => {
    for (let i = 0; i < guesses.length; i++) {
        if (word === guesses[i].join('')) return true
    }
    return false
}

export const sanitizeString = (str: string): string => {
    let r = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] in endOfWordToRegularLetters) {
            r.push(endOfWordToRegularLetters[str[i]])
        } else {
            r.push(str[i])
        }
    }
    return r.join('')
}

export const getCorrectAndPresent = (
    word: string,
    guess: string[]
): Letter[] => {
    const cleanWord = sanitizeString(word)
    const cleanGuess = guess.map(sanitizeString).join('')

    let correctAndPresent = {
        cleanWord: Array(cleanGuess.length).fill(Letter.Miss),
        cleanGuess: Array(cleanGuess.length).fill(Letter.Miss),
    }

    // For each letter of guess, check if it's correct
    for (let i = 0; i < cleanWord.length; i++) {
        if (word[i] === guess[i])
            correctAndPresent.cleanGuess[i] = correctAndPresent.cleanWord[i] =
                Letter.Correct
    }

    // Now the tricky part is to find the present
    // A letter is present iff it appears in the word somewhere that is not already present or correct
    for (let i = 0; i < cleanGuess.length; i++) {
        for (let j = 0; j < cleanWord.length; j++) {
            if (
                cleanGuess[i] === cleanWord[j] &&
                correctAndPresent.cleanWord[j] !== Letter.Correct &&
                correctAndPresent.cleanWord[j] !== Letter.Present
            )
                correctAndPresent.cleanGuess[i] = correctAndPresent.cleanWord[
                    j
                ] = Letter.Present
        }
    }

    return correctAndPresent.cleanGuess
}
