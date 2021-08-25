import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
const { verifyUser } = require('../../../scripts/verifyUser');
import { getSession } from 'next-auth/client'

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
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        const activeUser = await verifyUser(artistId, session.id, 'artists');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }

        const results = await query(
            `
                DELETE from families_artists 
                WHERE artist_id = ? AND family_id = ?
            `,
            [artistId, familyId]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
