import { NextApiHandler } from 'next'
import { query } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
    try {
        const { user_id } = req.query;
        if (req.method !== 'GET') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        if (!user_id) {
            return res.status(404).json({ message: `User id is required`})
        }
        const results = await query(
            `
                SELECT COUNT(*) FROM images
                WHERE user_id = ${user_id}
            `,
        )
        const countJSON = JSON.parse(JSON.stringify(results));
        return res.json({ count: countJSON[0]["COUNT(*)"] })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
