export const numberOfLetters = 5
export const numberOfRows = 6
export const word = 'לחמים'
export enum Letter {
    Present,
    Correct,
    Miss,
}
export const letterToBgColor = {
    [Letter.Present]: 'bg-orange-400',
    [Letter.Correct]: 'bg-green-400',
}

export const wordInGuesses = (word: string, guesses: string[][]): boolean => {
    for (let i = 0; i < guesses.length; i++) {
        if (word === guesses[i].join('')) return true
    }
    return false
}

export const getCorrectAndPresent = (word: string, guess: string): Letter[] => {
    let correctAndPresent = {
        guess: Array(guess.length).fill(Letter.Miss),
        word: Array(guess.length).fill(Letter.Miss),
    }

    // For each letter of guess, check if it's correct
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess[i])
            correctAndPresent.guess[i] = correctAndPresent.word[i] =
                Letter.Correct
    }

    // Now the tricky part is to find the present
    // A letter is present iff it appears in the word somewhere that is not already present or correct
    for (let i = 0; i < guess.length; i++) {
        for (let j = 0; j < word.length; j++) {
            if (
                guess[i] === word[j] &&
                correctAndPresent.word[j] !== Letter.Correct &&
                correctAndPresent.word[j] !== Letter.Present
            )
                correctAndPresent.guess[i] = correctAndPresent.word[j] =
                    Letter.Present
        }
    }

    return correctAndPresent.guess
}
