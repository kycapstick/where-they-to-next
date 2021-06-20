import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        let { name, facebook, instagram, tiktok, twitch, twitter, website, youtube } = JSON.parse(req.body)
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        } 

        const results = await query(
            `
                INSERT INTO social_links (user_id, name, facebook, instagram, tiktok, twitch, twitter, website, youtube)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [session.id, name, facebook, instagram, tiktok, twitch, twitter, website, youtube]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
