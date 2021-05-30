import { NextApiHandler } from 'next'
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
    try {
        const { user_id, pno = 0 } = req.query;
        if (req.method !== 'GET') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        if (!user_id) {
            return res.status(404).json({ message: `User id is required`})
        }
        const offset = Number(pno) * 20;
        const results = await query(
            `
                SELECT * FROM images
                WHERE user_id = ${user_id}
                LIMIT 10
                OFFSET ${offset}
            `,
        )
    
        return res.json({ results })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
