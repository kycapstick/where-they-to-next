import { NextApiHandler } from 'next'
import { query } from "../../lib/db";
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method !== 'GET') {
            return res.status(401).json({ message: `This method is not allowed`});
        }
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        const { pno = 0 } = req.query;
        const offset = Number(pno) * 20;
        const results = await query(
            `
                SELECT * FROM images
                WHERE user_id = ${session.id}
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
