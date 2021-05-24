import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const { verifyUser } = require('../../../scripts/verifyUser');

const handler: NextApiHandler = async (req, res) => {
    let { user_id, id, name, address, city, province, timezone, accent_color, accessibility_description, description } = req.body

    try {
        if (req.method !== 'POST') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        if (!id || !name || !address || !province || !city || !timezone) {
            return res
                .status(400)
                .json({ message: ' `id`, `name`, `address`, `city`, `province`, and `timezone` are all required' })
        } 
        if (!user_id) {
            return res.status(401).json({ message: `You must be logged in to complete this action`});
        }
        const activeUser = await verifyUser(id, user_id, 'venues');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }

        const results = await query(
            `
                UPDATE venues
                SET name = ?, address = ?, province = ?, city = ?, timezone = ?, description = ?, accent_color = ?, accessibility_description = ?
                WHERE id = ?
            `,
            [name, address, province, city, timezone, description, accent_color, accessibility_description, id ]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
