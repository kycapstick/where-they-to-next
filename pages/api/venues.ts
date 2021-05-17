import { NextApiHandler } from 'next'
const Venue = require('../../controllers/venueController');

const handler: NextApiHandler = async (req, res) => {
    try {
        const results = await Venue.getAllVenues();
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
