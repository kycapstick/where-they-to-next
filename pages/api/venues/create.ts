import { NextApiHandler } from 'next'
const { defaultValues } = require("../../../scripts/utilities");
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    let { name, address, city, province, timezone } = req.body
    const accent_color = defaultValues(req.body, 'accent_color');
    const accessibility_description = defaultValues(req.body, 'accessibility_description');
    const description = defaultValues(req.body, 'description');

    try {
        if (!name || !address || !province || !city || !timezone) {
            return res
                .status(400)
                .json({ message: '`name`, `address`, `city`, `province`, and `timezone` are all required' })
        } 

            const results = await query(
            `
                INSERT INTO venues (name, address, province, city, timezone, description, accent_color, accessibility_description)
                VALUES (?, ?, ?, ?, ?, ? , ?, ?)
            `,
            [filter.clean(name), filter.clean(address), filter.clean(province), filter.clean(city), filter.clean(timezone), description, accent_color, accessibility_description  ]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
