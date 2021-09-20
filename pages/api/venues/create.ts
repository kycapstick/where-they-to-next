import { NextApiHandler } from 'next'
import { generateSlug, query } from '../../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
    const { digital, name, address, city, province, color = '#000000', accessibility_description = null, description = null, image = null, socials } = JSON.parse(req.body)

    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        if (!name || !address) {
            return res
                .status(400)
                .json({ message: '`name` and `address` are required' })
        } 
        const slug = await generateSlug(name, 'venues');


        const results = await query(
            `
                INSERT INTO venues (user_id, digital, name, address, province, city, description, accent_color, accessibility_description, slug, image_id, social_links_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?)
            `,
            [session.id, digital, name, address, province, city, description, color, accessibility_description, slug, image, socials ]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
