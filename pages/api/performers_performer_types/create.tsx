import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { performerId, performerTypeId } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!performerId || !performerTypeId) {
            return res
                .status(400)
                .json({ message: '`performer_id` and `performer_type_id` are both required' })
        } 

        const results = await query(
            `
                INSERT INTO performers_performer_types (performer_id, performer_type_id)
                VALUES (?, ?)
            `,
            [performerId, performerTypeId]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
