import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    let { id, name, date, show_time, description = null, tickets = null, tickets_url = null, accent_color = null, accessibility_description = null } = req.body;
    try {
        if (!id || !name || !date || !show_time) {
            return res
                .status(400)
                .json({ message: '`id`,`name`, and `bio` are all required' })
        }

        const results = await query(
            `
                UPDATE performers
                SET name = ?, date = ?, show_time = ?, description = ?, tickets = ?, tickets_url = ?, accent_color = ?, accessibility_description = ?
                WHERE id = ?
            `,
            [name, date, show_time, description, tickets, tickets_url, accent_color, accessibility_description, id]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
