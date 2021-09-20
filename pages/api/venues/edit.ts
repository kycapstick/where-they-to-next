import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
import { getSession } from 'next-auth/client'

const { verifyUser } = require('../../../scripts/verifyUser');

const handler: NextApiHandler = async (req, res) => {
    let { id, digital, name, address, city, province, color, accessibilityDescription = null, description = null, image, socials } = JSON.parse(req.body)

    try {
        if (req.method !== 'POST') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        if (!id || !name || !address) {
            return res
                .status(400)
                .json({ message: ' `id`, `name`, and `address` are all required' })
        } 
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        const activeUser = await verifyUser(id, session.id, 'venues');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }

        const results = await query(
            `
                UPDATE venues
                SET digital = ?, name = ?, address = ?, province = ?, city = ?, description = ?, accent_color = ?, accessibility_description = ?, image_id = ?, social_links_id = ?
                WHERE id = ?
            `,
            [digital, name, address, province, city, description, color, accessibilityDescription, image, socials, id ]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
