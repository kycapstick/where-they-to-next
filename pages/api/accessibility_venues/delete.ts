import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
const { verifyUser } = require('../../../scripts/verifyUser');
import { getSession } from 'next-auth/client'

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
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        const activeUser = await verifyUser(venueId, session.id, 'venues');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }

        const results = await query(
            `
                DELETE from accessibility_venues
                WHERE accessibility_id = ? AND venue_id = ?
            `,
            [accessibilityId, venueId]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
