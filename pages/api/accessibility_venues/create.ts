import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { accessibilityId, venueId } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!accessibilityId || !venueId) {
            return res
                .status(400)
                .json({ message: '`accessibilityId` and `venueId` are both required' })
        } 

        const results = await query(
            `
                INSERT INTO accessibility_venues (accessibility_id, venue_id)
                VALUES (?, ?)
            `,
            [accessibilityId, venueId]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
