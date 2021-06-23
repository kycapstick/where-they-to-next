import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { performerId, familyId } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!performerId || !familyId) {
            return res
                .status(400)
                .json({ message: '`performer_id` and `family_id` are both required' })
        } 

        const results = await query(
            `
                INSERT INTO families_performers (performer_id, family_id)
                VALUES (?, ?)
            `,
            [performerId, familyId]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
