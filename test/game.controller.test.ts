import {
    generateEmojiFromGuesses,
    getCorrectAndPresent,
    Letter,
    wordInGuesses,
} from '../pages/GameController'

describe('getCorrectAndPresent', () => {
    it('should generate correct for the same words', () => {
        const result = getCorrectAndPresent('word', ['w', 'o', 'r', 'd'])
        expect(result).toEqual([
            Letter.Correct,
            Letter.Correct,
            Letter.Correct,
            Letter.Correct,
        ])
    })
    it('should generate present for matching words', () => {
        const result = getCorrectAndPresent('word', ['d', 'r', 'o', 'w'])
        expect(result).toEqual([
            Letter.Present,
            Letter.Present,
            Letter.Present,
            Letter.Present,
        ])
    })
    it('should generate mixed type for words', () => {
        const result = getCorrectAndPresent('word', ['w', 'r', 'o', 'd'])
        expect(result).toEqual([
            Letter.Correct,
            Letter.Present,
            Letter.Present,
            Letter.Correct,
        ])
    })
    it('should generate miss for words', () => {
        const result = getCorrectAndPresent('word', ['l', 'i', 'f', 'f'])
        expect(result).toEqual([
            Letter.Miss,
            Letter.Miss,
            Letter.Miss,
            Letter.Miss,
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
            Letter.Present,
            Letter.Correct,
            Letter.Miss,
            Letter.Miss,
            Letter.Miss,
            Letter.Correct,
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

describe('generateEmojiFromGuesses', () => {
    it('should generate an emoji board', () => {
        const result = generateEmojiFromGuesses('word', [
            ['n', 'o', 'd', 'r'],
            ['t', 'o', 'l', 'd'],
            ['g', 'r', 'o', 'd'],
            ['w', 'o', 'r', 'd'],
        ])
        expect(result).toEqual(`⬛🟩🟨🟨\n⬛🟩⬛🟩\n⬛🟨🟨🟩\n🟩🟩🟩🟩`)
    })
    it('should generate a missing emoji board', () => {
        const result = generateEmojiFromGuesses('word', [['', '', '', '']])
        expect(result).toEqual(`⬛⬛⬛⬛`)
    })
})
