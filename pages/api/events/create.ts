import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { name, date, show_time, description = null, tickets = null, tickets_url = null, accent_color = null, accessibility_description = null } = req.body;
    try {
        if (!name || !date || !show_time) {
            return res
                .status(400)
                .json({ message: '`name`, `show_time`, and `date` are required' })
        } 

            const results = await query(
            `
                INSERT INTO events (name, date, show_time, description, tickets, tickets_url, accent_color, accessibility_description)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [name, date, show_time, description, tickets, tickets_url, accent_color, accessibility_description]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler