import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const { verifyUser } = require('../../../scripts/verifyUser');

const handler: NextApiHandler = async (req, res) => {
    let { user_id, id, name, date, show_time, description = null, tickets = null, tickets_url = null, accent_color = null, accessibility_description = null, image_url = null, image_alt = null } = req.body;
    try {
        if (!user_id) {
            return res.status(401).json({ message: `You must be logged in to complete this action`});
        }
        const activeUser = await verifyUser(id, user_id, 'events');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }
        if (!id || !name || !date || !show_time) {
            return res
                .status(400)
                .json({ message: '`id`,`name`, and `bio` are all required' })
        }

        const results = await query(
            `
                UPDATE events
                SET name = ?, date = ?, show_time = ?, description = ?, tickets = ?, tickets_url = ?, accent_color = ?, accessibility_description = ?, image_url = ?, image_alt = ?
                WHERE id = ?
            `,
            [name, date, show_time, description, tickets, tickets_url, accent_color, accessibility_description, image_url, image_alt, id]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
