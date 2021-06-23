import { NextApiHandler } from 'next'
import { query, generateSlug } from '../../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
    let { name } = JSON.parse(req.body)
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        const session = await getSession({ req });
        if (!session) {
            return res.status(404).json({ message: `You must be logged in`})
        }
        if (!name) {
            return res
                .status(400)
                .json({ message: '`name` are both required' })
        } 
        const results = await query(
            `
                INSERT INTO performer_types (name)
                VALUES (?)
            `,
            [name]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
