import type { NextApiRequest, NextApiResponse } from 'next'
import words from '../../resources/words.json'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (typeof req.query.word === 'string' && words.includes(req.query.word))
        res.status(200).json({ found: true })
    else res.status(200).json({ found: false })
}

export default handler
