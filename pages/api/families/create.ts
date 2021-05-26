import { NextApiHandler } from 'next'
import { query, generateSlug } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { user_id, name, tips = null, description = null, accent_color = null } = req.body
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!name) {
            return res
                .status(400)
                .json({ message: '`name` is required' })
        } 
        const slug = await generateSlug(name, 'families');


        const results = await query(
            `
                INSERT INTO families (user_id, name, description, tips, accent_color, slug)
                VALUES (?, ?, ?, ?, ?, ?)
            `,
            [user_id, name, description, tips, accent_color, slug]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
