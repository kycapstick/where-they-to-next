import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const { defaultValues } = require("../../../scripts/utilities");

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    let { id, name, address, city, province, timezone } = req.body
    const accent_color = defaultValues(req.body, 'accent_color');
    const accessibility_description = defaultValues(req.body, 'accessibility_description');
    const description = defaultValues(req.body, 'description');
    try {
        if (!id || !name || !address || !province || !city || !timezone) {
            return res
                .status(400)
                .json({ message: ' `id`, `name`, `address`, `city`, `province`, and `timezone` are all required' })
        } 

        const results = await query(
            `
                UPDATE venues
                SET name = ?, address = ?, province = ?, city = ?, timezone = ?, description = ?, accent_color = ?, accessibility_description = ?
                WHERE id = ?
            `,
            [filter.clean(name), filter.clean(address), filter.clean(province), filter.clean(city), filter.clean(timezone), description, accent_color, accessibility_description, id ]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
