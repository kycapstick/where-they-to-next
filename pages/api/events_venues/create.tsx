import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { eventId, id } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!eventId || !id) {
            return res
                .status(400)
                .json({ message: '`eventId and `id` are both required' })
        } 

        const results = await query(
            `
                INSERT INTO events_venues (event_id, venue_id)
                VALUES (?, ?)
            `,
            [eventId, id]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
