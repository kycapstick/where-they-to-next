import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { artistId, artistTypeId } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!artistId || !artistTypeId) {
            return res
                .status(400)
                .json({ message: '`artist_id` and `artist_type_id` are both required' })
        } 

        const results = await query(
            `
                INSERT INTO artists_artist_types (artist_id, artist_type_id)
                VALUES (?, ?)
            `,
            [artistId, artistTypeId]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
