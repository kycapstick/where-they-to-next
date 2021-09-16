import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const { verifyUser } = require('../../../scripts/verifyUser');
import { getSession } from 'next-auth/client'


const handler: NextApiHandler = async (req, res) => {
    const { id, name, description = null, color = "#000000", tips = null, image = null, socials = null } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        if (!id || !name ) {
            return res
                .status(400)
                .json({ message: '`id`,`name`, and `bio` are all required' })
        }
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        const activeUser = await verifyUser(id, session.id, 'families');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }

        const results = await query(
            `
                UPDATE families
                SET name = ?, description = ?, accent_color = ?, tips = ?, image_id = ?, social_links_id = ?
                WHERE id = ?
            `,
            [name, description, color, tips, image, socials, id]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
