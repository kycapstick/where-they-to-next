import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const { verifyUser } = require('../../../scripts/verifyUser');

const handler: NextApiHandler = async (req, res) => {
    const { user_id, id } = req.query;
    try {
        if (req.method !== 'DELETE') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        if (typeof parseInt(id.toString()) !== 'number') {
            return res.status(400).json({ message: '`id` must be a number' })
        }
        if (!user_id) {
            return res.status(401).json({ message: `You must be logged in to complete this action`});
        }
        const activeUser = await verifyUser(id, user_id, 'artists');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }
        const results = await query(
            `
                DELETE FROM artists
                WHERE id = ?
            `,
            id
        )
        res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
