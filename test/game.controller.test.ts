import React from 'react'
import { getCorrectAndPresent, Letter } from '../pages/GameController'

describe('GameController', () => {
    it('should generate correct for the same words', () => {
        const result = getCorrectAndPresent('word', 'word')
        expect(result).toEqual([
            Letter.Correct,
            Letter.Correct,
            Letter.Correct,
            Letter.Correct,
        ])
    })
    it('should generate present for matching words', () => {
        const result = getCorrectAndPresent('word', 'drow')
        expect(result).toEqual([
            Letter.Present,
            Letter.Present,
            Letter.Present,
            Letter.Present,
        ])
    })
    it('should generate mixed type for words', () => {
        const result = getCorrectAndPresent('word', 'wrod')
        expect(result).toEqual([
            Letter.Correct,
            Letter.Present,
            Letter.Present,
            Letter.Correct,
        ])
    })
    it('should generate miss for words', () => {
        const result = getCorrectAndPresent('word', 'liff')
        expect(result).toEqual([
            Letter.Miss,
            Letter.Miss,
            Letter.Miss,
            Letter.Miss,
        ])
    })
    it('should generate mixed types for words with repeating letters', () => {
        const result = getCorrectAndPresent('wordos', 'oompas')
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
