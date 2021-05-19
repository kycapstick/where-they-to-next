import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    let { name, bio, tips = null, accent_color = "#000000" } = req.body
    try {
        if (!name || !bio) {
            return res
                .status(400)
                .json({ message: '`name` and `bio` are both required' })
        } 

            const results = await query(
            `
                INSERT INTO performers (name, bio, tips, accent_color)
                VALUES (?, ?, ?, ?)
            `,
            [filter.clean(name), filter.clean(bio), tips, accent_color]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
