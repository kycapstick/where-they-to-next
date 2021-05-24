import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'


const handler: NextApiHandler = async (req, res) => {
    let { user_id, name, bio, tips = null, accent_color = "#000000" } = req.body
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!user_id) {
            return res.status(401).json({ message: `You must be logged in to complete this task`});
        }
        if (!name) {
            return res
                .status(400)
                .json({ message: '`name` are both required' })
        } 

            const results = await query(
            `
                INSERT INTO performers (user_id, name, bio, tips, accent_color)
                VALUES (?, ?, ?, ?, ?)
            `,
            [user_id, name, bio, tips, accent_color]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
