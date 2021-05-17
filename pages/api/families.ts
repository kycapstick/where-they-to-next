import { NextApiHandler } from 'next'
const Family = require('../../controllers/familyController');

const handler: NextApiHandler = async (req, res) => {
    try {
        const results = await Family.getAllFamilies();
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
