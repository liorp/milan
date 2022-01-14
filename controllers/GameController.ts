export type Board = string[][]
export const numberOfLetters = 5
export const numberOfRows = 6
export const word = 'לחמים'
export const empty = '-'

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

// The enum ordering is used in order to always push a better result into the dict
export enum LetterType {
    Unevaluated,
    Miss,
    Present,
    Correct,
}

export const letterTypeToBgColor = {
    [LetterType.Unevaluated]: 'hg-unevaluated',
    [LetterType.Miss]: 'bg-zinc-400',
    [LetterType.Present]: 'bg-orange-400',
    [LetterType.Correct]: 'bg-green-400',
}

export const letterTypeToEmoji = {
    [LetterType.Miss]: '⬛',
    [LetterType.Present]: '🟨',
    [LetterType.Correct]: '🟩',
}

export const keyboardLettersFromGuesses = (word: string, guesses: Board) => {
    let letters = {
        א: LetterType.Unevaluated,
        ב: LetterType.Unevaluated,
        ג: LetterType.Unevaluated,
        ד: LetterType.Unevaluated,
        ה: LetterType.Unevaluated,
        ו: LetterType.Unevaluated,
        ז: LetterType.Unevaluated,
        ח: LetterType.Unevaluated,
        ט: LetterType.Unevaluated,
        י: LetterType.Unevaluated,
        כ: LetterType.Unevaluated,
        ל: LetterType.Unevaluated,
        מ: LetterType.Unevaluated,
        נ: LetterType.Unevaluated,
        ס: LetterType.Unevaluated,
        ע: LetterType.Unevaluated,
        פ: LetterType.Unevaluated,
        צ: LetterType.Unevaluated,
        ק: LetterType.Unevaluated,
        ר: LetterType.Unevaluated,
        ש: LetterType.Unevaluated,
        ת: LetterType.Unevaluated,
        ם: LetterType.Unevaluated,
        ן: LetterType.Unevaluated,
        ץ: LetterType.Unevaluated,
        ף: LetterType.Unevaluated,
        ך: LetterType.Unevaluated,
    }
    for (const i in guesses) {
        let line = guesses[i]
        let r = getCorrectAndPresent(word, line)
        for (const t in r) {
            // Using the enum ordering in order to always push a better result into the dict
            if (r[t] > letters[line[t]]) letters[line[t]] = r[t]
        }
    }
    return letters
}

export const emojiFromGuesses = (word: string, guesses: Board): string => {
    let content = []
    for (let i = 0; i < guesses.length; i++) {
        content.push(
            getCorrectAndPresent(word, guesses[i])
                .map((l) => letterTypeToEmoji[l])
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
): LetterType[] => {
    const cleanWord = sanitizeString(word)
    const cleanGuess = guess
        .map((e) => (e === '' && empty) || e)
        .map(sanitizeString)
        .join('')

    let correctAndPresent = {
        cleanWord: Array(cleanWord.length).fill(LetterType.Unevaluated),
        cleanGuess: Array(cleanGuess.length).fill(LetterType.Unevaluated),
    }

    // For each letter of guess, check if it's correct
    for (let i = 0; i < cleanWord.length; i++) {
        if (cleanWord[i] === cleanGuess[i])
            correctAndPresent.cleanGuess[i] = correctAndPresent.cleanWord[i] =
                LetterType.Correct
    }

    // Now the tricky part is to find the present
    // A letter is present iff it appears in the word somewhere that is not already present or correct
    for (let i = 0; i < cleanGuess.length; i++) {
        for (let j = 0; j < cleanWord.length; j++) {
            if (
                cleanGuess[i] === cleanWord[j] &&
                correctAndPresent.cleanGuess[i] !== LetterType.Correct &&
                correctAndPresent.cleanWord[j] !== LetterType.Correct &&
                correctAndPresent.cleanGuess[i] !== LetterType.Present &&
                correctAndPresent.cleanWord[j] !== LetterType.Present
            )
                correctAndPresent.cleanGuess[i] = correctAndPresent.cleanWord[
                    j
                ] = LetterType.Present
        }
        if (
            correctAndPresent.cleanGuess[i] === LetterType.Unevaluated &&
            cleanGuess[i] !== empty
        ) {
            // Finally, set the character to miss
            correctAndPresent.cleanGuess[i] = LetterType.Miss
        }
    }

    return correctAndPresent.cleanGuess
}
