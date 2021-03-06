import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { user_id, id } = req.query;
    let results;
    try {
        
        if (!id) {
            return res.status(400).json({ message: '`user_id` and `id` required' })
        }
        switch(req.method) {
            case 'GET': 
                results = await query(
                    `
                        SELECT id FROM artists_users
                        WHERE artist_id = ? AND user_id = ?
                    `,
                    [Number(id), Number(user_id)]
                )
                res.json(results)
            break;
            case 'POST': 
                results = await query(
                    `
                        INSERT INTO artists_users (artist_id, user_id)
                        values(?, ?)
                    `,
                    [Number(id), Number(user_id)]
                )
                res.json(results)
            break;
            case 'DELETE': 
                results = await query(
                    `
                        DELETE FROM artists_users
                        WHERE id = ?
                    `,
                    Number(id)
                )
                res.json(results)
            break;
        }

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
