import { NextApiHandler } from 'next'
import { generateSlug, query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { user_id, name, address, city, province, timezone, accent_color = '#000000', accessibility_description = null, description = null, image_url = null, image_alt = null } = req.body

    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!user_id) {
            return res.status(401).json({ message: `You must be logged in to complete this task`});
        }
        if (!name || !address || !province || !city || !timezone) {
            return res
                .status(400)
                .json({ message: '`name`, `address`, `city`, `province`, and `timezone` are all required' })
        } 
        const slug = await generateSlug(name, 'venues');


        const results = await query(
            `
                INSERT INTO venues (user_id, name, address, province, city, timezone, description, accent_color, accessibility_description, slug, image_url, image_alt)
                VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?)
            `,
            [user_id, name, address, province, city, timezone, description, accent_color, accessibility_description, slug, image_url, image_alt ]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
