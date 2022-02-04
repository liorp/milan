import {
    emojiFromGuesses,
    getCorrectAndPresent,
    keyboardLettersFromGuesses,
    LetterType,
    sanitizeString,
    wordInGuesses,
} from '../controllers/GameController'

describe('getCorrectAndPresent', () => {
    it('should generate correct for the same words', () => {
        const result = getCorrectAndPresent('word', ['w', 'o', 'r', 'd'])
        expect(result).toEqual([
            LetterType.Correct,
            LetterType.Correct,
            LetterType.Correct,
            LetterType.Correct,
        ])
    })
    it('should generate correct for similar words', () => {
        const result = getCorrectAndPresent('שונות', ['ש', 'ו', 'א', 'ל', 'ת'])
        expect(result).toEqual([
            LetterType.Correct,
            LetterType.Correct,
            LetterType.Miss,
            LetterType.Miss,
            LetterType.Correct,
        ])
    })
    it('should generate present for matching words', () => {
        const result = getCorrectAndPresent('word', ['d', 'r', 'o', 'w'])
        expect(result).toEqual([
            LetterType.Present,
            LetterType.Present,
            LetterType.Present,
            LetterType.Present,
        ])
    })
    it('should generate mixed type for words', () => {
        const result = getCorrectAndPresent('word', ['w', 'r', 'o', 'd'])
        expect(result).toEqual([
            LetterType.Correct,
            LetterType.Present,
            LetterType.Present,
            LetterType.Correct,
        ])
    })
    it('should generate miss for words', () => {
        const result = getCorrectAndPresent('word', ['l', 'i', 'f', 'f'])
        expect(result).toEqual([
            LetterType.Miss,
            LetterType.Miss,
            LetterType.Miss,
            LetterType.Miss,
        ])
    })
    it('should generate mixed types for words with repeating letters', () => {
        const result = getCorrectAndPresent('wordos', [
            'o',
            'o',
            'm',
            'p',
            'a',
            's',
        ])
        expect(result).toEqual([
            LetterType.Present,
            LetterType.Correct,
            LetterType.Miss,
            LetterType.Miss,
            LetterType.Miss,
            LetterType.Correct,
        ])
    })
})

describe('wordInGuesses', () => {
    it('should return true for word in guesses', () => {
        const result = wordInGuesses('word', [
            ['n', 'o', 'd', 'd'],
            ['w', 'o', 'r', 'd'],
        ])
        expect(result).toBeTruthy()
    })
    it('should return false for word not in guesses', () => {
        const result = wordInGuesses('word', [
            ['n', 'o', 'd', 'd'],
            ['w', 'o', 'j', 'd'],
        ])
        expect(result).toBeFalsy()
    })
})

describe('emojiFromGuesses', () => {
    it('should generate an emoji board', () => {
        const result = emojiFromGuesses('word', [
            ['n', 'o', 'd', 'r'],
            ['t', 'o', 'l', 'd'],
            ['g', 'r', 'o', 'd'],
            ['w', 'o', 'r', 'd'],
        ])
        expect(result).toEqual(`⬛🟩🟨🟨\n⬛🟩⬛🟩\n⬛🟨🟨🟩\n🟩🟩🟩🟩`)
    })
    it('should generate a hebrew emoji board', () => {
        const result = emojiFromGuesses(
            'מילה',
            [
                ['ב', 'ק', 'ב', 'ה'],
                ['פ', 'מ', 'ל', 'ה'],
                ['מ', 'י', 'ל', 'ה'],
            ],
            true
        )
        expect(result).toEqual(`🟩⬛⬛⬛\n🟩🟩🟨⬛\n🟩🟩🟩🟩`)
    })
    it('should generate a missing emoji board', () => {
        const result = emojiFromGuesses('word', [['', '', '', '']])
        expect(result).toEqual(``)
    })
})

describe('sanitizeString', () => {
    it('should not do anything to english string', () => {
        const result = sanitizeString('word')
        expect(result).toEqual('word')
    })
    it('should replace end characters', () => {
        const result = sanitizeString('מים')
        expect(result).toEqual('מימ')
    })
    it('should replace end characters anywhere', () => {
        const result = sanitizeString('רץיתי')
        expect(result).toEqual('רציתי')
    })

    it('should not replace regular characters anywhere', () => {
        const result = sanitizeString('רציפי')
        expect(result).toEqual('רציפי')
    })
})

describe('keyboardLettersFromGuesses', () => {
    // vscode flips array in editor if it's all hebrew letters :(
    it('should correct every letter', () => {
        const result = keyboardLettersFromGuesses('בור', [
            ['ג', 'ו', 'ר'],
            ['ב', 'ו', 'ר'],
        ])
        expect(result).toEqual({
            א: LetterType.Unevaluated,
            ב: LetterType.Correct,
            ג: LetterType.Miss,
            ד: LetterType.Unevaluated,
            ה: LetterType.Unevaluated,
            ו: LetterType.Correct,
            ז: LetterType.Unevaluated,
            ח: LetterType.Unevaluated,
            ט: LetterType.Unevaluated,
            י: LetterType.Unevaluated,
            כ: LetterType.Unevaluated,
            ך: LetterType.Unevaluated,
            ל: LetterType.Unevaluated,
            מ: LetterType.Unevaluated,
            ם: LetterType.Unevaluated,
            נ: LetterType.Unevaluated,
            ן: LetterType.Unevaluated,
            ס: LetterType.Unevaluated,
            ע: LetterType.Unevaluated,
            פ: LetterType.Unevaluated,
            ף: LetterType.Unevaluated,
            צ: LetterType.Unevaluated,
            ץ: LetterType.Unevaluated,
            ק: LetterType.Unevaluated,
            ר: LetterType.Correct,
            ש: LetterType.Unevaluated,
            ת: LetterType.Unevaluated,
        })
    })
    it('should hit ב', () => {
        const result = keyboardLettersFromGuesses('בור', [['ג', 'ב', 'ל']])
        expect(result).toEqual({
            א: LetterType.Unevaluated,
            ב: LetterType.Present,
            ג: LetterType.Miss,
            ד: LetterType.Unevaluated,
            ה: LetterType.Unevaluated,
            ו: LetterType.Unevaluated,
            ז: LetterType.Unevaluated,
            ח: LetterType.Unevaluated,
            ט: LetterType.Unevaluated,
            י: LetterType.Unevaluated,
            כ: LetterType.Unevaluated,
            ך: LetterType.Unevaluated,
            ל: LetterType.Miss,
            מ: LetterType.Unevaluated,
            ם: LetterType.Unevaluated,
            נ: LetterType.Unevaluated,
            ן: LetterType.Unevaluated,
            ס: LetterType.Unevaluated,
            ע: LetterType.Unevaluated,
            פ: LetterType.Unevaluated,
            ף: LetterType.Unevaluated,
            צ: LetterType.Unevaluated,
            ץ: LetterType.Unevaluated,
            ק: LetterType.Unevaluated,
            ר: LetterType.Unevaluated,
            ש: LetterType.Unevaluated,
            ת: LetterType.Unevaluated,
        })
    })
    it('should miss regular letters', () => {
        const result = keyboardLettersFromGuesses('בור', [
            ['צ', 'ו', 'ר'],
            ['ב', 'ו', 'ר'],
        ])
        expect(result).toEqual({
            א: LetterType.Unevaluated,
            ב: LetterType.Correct,
            ג: LetterType.Unevaluated,
            ד: LetterType.Unevaluated,
            ה: LetterType.Unevaluated,
            ו: LetterType.Correct,
            ז: LetterType.Unevaluated,
            ח: LetterType.Unevaluated,
            ט: LetterType.Unevaluated,
            י: LetterType.Unevaluated,
            כ: LetterType.Unevaluated,
            ך: LetterType.Unevaluated,
            ל: LetterType.Unevaluated,
            מ: LetterType.Unevaluated,
            ם: LetterType.Unevaluated,
            נ: LetterType.Unevaluated,
            ן: LetterType.Unevaluated,
            ס: LetterType.Unevaluated,
            ע: LetterType.Unevaluated,
            פ: LetterType.Unevaluated,
            ף: LetterType.Unevaluated,
            צ: LetterType.Miss,
            ץ: LetterType.Unevaluated,
            ק: LetterType.Unevaluated,
            ר: LetterType.Correct,
            ש: LetterType.Unevaluated,
            ת: LetterType.Unevaluated,
        })
    })
})
