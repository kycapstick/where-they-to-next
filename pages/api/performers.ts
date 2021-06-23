import { NextApiHandler } from 'next'
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== 'GET') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        const results = await query(
            `
                SELECT * FROM performers
            `,
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
