import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const { verifyUser } = require('../../../scripts/verifyUser');

const handler: NextApiHandler = async (req, res) => {
    const { user_id, id, name, description = null, accent_color = "#000000", tips = null } = req.body
    try {
        if (req.method !== 'POST') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        if (!id || !name ) {
            return res
                .status(400)
                .json({ message: '`id`,`name`, and `bio` are all required' })
        }
        if (!user_id) {
            return res.status(401).json({ message: `You must be logged in to complete this action`});
        }
        const activeUser = await verifyUser(id, user_id, 'families');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }

        const results = await query(
            `
                UPDATE families
                SET name = ?, description = ?, accent_color = ?, tips = ?
                WHERE id = ?
            `,
            [name, description, accent_color, tips, id]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
