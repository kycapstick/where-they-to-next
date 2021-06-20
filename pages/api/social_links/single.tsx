import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        const results = await query(
            `
                SELECT * FROM social_links
                WHERE id = ?
            `,
            id
        )
        if (results[0]) {
            res.json(results[0])
            return;
        }
        res.json([])
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
