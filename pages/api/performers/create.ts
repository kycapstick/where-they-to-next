import { NextApiHandler } from 'next'
import { query, generateSlug } from '../../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
    let { user_id, name, bio, tips = null, accent_color = "#000000", image_id = null } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        if (!name) {
            return res
                .status(400)
                .json({ message: '`name` is required' })
        } 
        const slug = await generateSlug(name, 'performers');

            const results = await query(
            `
                INSERT INTO performers (user_id, name, bio, tips, accent_color, slug, image_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [user_id, name, bio, tips, accent_color, slug, image_id]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
