import { NextApiHandler } from 'next'
import { query, generateSlug } from '../../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
    let { name, description, tips = null, tipsLink = null, color = "#000000", image = null, socials = null } = JSON.parse(req.body)
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
        const slug = await generateSlug(name, 'families');

        const results = await query(
            `
                INSERT INTO families (user_id, name, description, tips, tips_link, accent_color, slug, image_id, social_links_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [session.id, name, description, tips, tipsLink, color, slug, image, socials]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
