import { NextApiHandler } from 'next'
import { query, generateSlug } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { user_id, name, bio, tips = null, accent_color = "#000000", image_url = null, image_alt = null } = req.body
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
        const slug = await generateSlug(name, 'performers');
        

            const results = await query(
            `
                INSERT INTO performers (user_id, name, bio, tips, accent_color, slug, image_url, image_alt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [user_id, name, bio, tips, accent_color, slug, image_url, image_alt]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
