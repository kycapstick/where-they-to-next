import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    let { user_id, name, address, city, province, timezone, accent_color, accessibility_description, description } = req.body

    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        if (!user_id) {
            return res.status(401).json({ message: `You must be logged in to complete this task`});
        }
        if (!name || !address || !province || !city || !timezone) {
            return res
                .status(400)
                .json({ message: '`name`, `address`, `city`, `province`, and `timezone` are all required' })
        } 

            const results = await query(
            `
                INSERT INTO venues (user_id, name, address, province, city, timezone, description, accent_color, accessibility_description)
                VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?)
            `,
            [user_id, name, address, province, city, timezone, description, accent_color, accessibility_description  ]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
