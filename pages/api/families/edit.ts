import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const { defaultValues } = require('../../../scripts/utilities');

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    const { id, name } = req.body
    const description = defaultValues(req.body, 'description');
    const accent_color = defaultValues(req.body, 'accent_color');
    const tips = defaultValues(req.body, 'tips');
    try {
        if (!id || !name ) {
            return res
                .status(400)
                .json({ message: '`id`,`name`, and `bio` are all required' })
        }

        const results = await query(
            `
                UPDATE families
                SET name = ?, description = ?, accent_color = ?, tips = ?
                WHERE id = ?
            `,
            [filter.clean(name), description, accent_color, tips, id]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
