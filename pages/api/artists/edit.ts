import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const { verifyUser } = require('../../../scripts/verifyUser');
import { getSession } from 'next-auth/client'


const handler: NextApiHandler = async (req, res) => {
    const { id, name, bio = null, color = "#000000", tips = null, tipsLink = null, socials = null, image = null } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        if (!id || !name) {
            return res
                .status(400)
                .json({ message: '`id` and `name` are both required' })
        }
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        const activeUser = await verifyUser(id, session.id, 'artists');
        if (!activeUser) {
            return res.status(401).json({ message: `You are not authorized to update this entry`});
        }

        const results = await query(
            `
                UPDATE artists
                SET name = ?, bio = ?, accent_color = ?, tips = ?, tips_link = ?, image_id = ?, social_links_id = ?
                WHERE id = ?
            `,
            [name, bio, color, tips, tipsLink, image, socials, id]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
