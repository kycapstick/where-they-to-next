import { NextApiHandler } from 'next'
const Performer = require('../../controllers/performerController');

const handler: NextApiHandler = async (req, res) => {
    try {
        const results = await Performer.getAllPerformers();
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
