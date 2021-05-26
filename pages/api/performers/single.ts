import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { slug } = req.query;
    try {
        if (!slug) {
            return res.status(400).json({ message: '`slug` required' })
        }
        const results = await query(
            `
                SELECT * FROM performers
                WHERE slug = ?
            `,
            slug
        )
        res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
