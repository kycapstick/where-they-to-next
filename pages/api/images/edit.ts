import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
    let { id, description } = JSON.parse(req.body);
    console.log(req.body);
    console.log(description);
    try {
        const session = await getSession({ req });
        if (!session || !session.id) {
            return res.status(401).json({ message: `You must be logged in to complete this action`});
        }
        if (!id || !description) {
            return res
                .status(400)
                .json({ message: '`id` and `description` are required' })
        }

        const results = await query(
            `
                UPDATE images
                SET alt = ?
                WHERE id = ?
            `,
            [description, id]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
