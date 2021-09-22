import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { accessibilityId, eventId } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!accessibilityId || !eventId) {
            return res
                .status(400)
                .json({ message: '`accessibilityId` and `eventId` are both required' })
        } 

        const results = await query(
            `
                INSERT INTO accessibility_events (accessibility_id, event_id)
                VALUES (?, ?)
            `,
            [accessibilityId, eventId]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
