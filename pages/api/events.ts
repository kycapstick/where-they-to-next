import { NextApiHandler } from 'next'
const Event = require('../../controllers/eventController');

const handler: NextApiHandler = async (req, res) => {
    try {
        const results = await Event.getAllEvents();
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
