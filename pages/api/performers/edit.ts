import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    const { id, name, bio, accent_color = "#000000", tips = null } = req.body
    try {
        if (!id || !name || !bio) {
            return res
                .status(400)
                .json({ message: '`id`,`name`, and `bio` are all required' })
        }

        const results = await query(
            `
                UPDATE performers
                SET name = ?, bio = ?, accent_color = ?, tips = ?
                WHERE id = ?
            `,
            [filter.clean(name), filter.clean(bio), accent_color, tips, id]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
