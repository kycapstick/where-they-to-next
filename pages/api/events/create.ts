import { NextApiHandler } from 'next'
import { generateSlug, query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { user_id, name, date, show_time, description = null, tickets = null, tickets_url = null, accent_color = null, accessibility_description = null, image_url = null, image_alt = null } = req.body;
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!user_id) {
            return res.status(401).json({ message: `You must be logged in to complete this task`});
        }
        if (!name || !date || !show_time ) {
            return res
                .status(400)
                .json({ message: '`name`, `show_time`, and `date` are required' })
        } 

        const slug = await generateSlug(name, 'events');

            const results = await query(
            `
                INSERT INTO events (user_id, name, date, show_time, description, tickets, tickets_url, accent_color, accessibility_description, slug, image_alt, image_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [user_id, name, date, show_time, description, tickets, tickets_url, accent_color, accessibility_description, slug, image_alt, image_url]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler