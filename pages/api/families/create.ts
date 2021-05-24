import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { name, tips = null, description = null, accent_color = null } = req.body
    try {
        if (!name) {
            return res
                .status(400)
                .json({ message: '`name` is required' })
        } 

            const results = await query(
            `
                INSERT INTO families (name, description, tips, accent_color)
                VALUES (?, ?, ?, ?)
            `,
            [name, description, tips, accent_color]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
