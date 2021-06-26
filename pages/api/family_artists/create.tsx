import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { artistId, familyId } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!artistId || !familyId) {
            return res
                .status(400)
                .json({ message: '`artist_id` and `family_id` are both required' })
        } 

        const results = await query(
            `
                INSERT INTO families_artists (artist_id, family_id)
                VALUES (?, ?)
            `,
            [artistId, familyId]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
