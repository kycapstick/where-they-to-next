import { NextApiHandler } from 'next'
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== 'GET') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        const { type, q } = req.query;
        if (!type || !q) {
            return res.status(404).json({ message: `Both type and q are required `});
        }
        const searchQuery = String(q).replace(/[aeiouy]/gi, '_');
        const results = await query(
            `
                SELECT * FROM ${type}
                WHERE name LIKE '%${searchQuery}%'
                LIMIT 10
            `,
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
