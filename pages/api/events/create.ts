import { NextApiHandler } from 'next'
import { generateSlug, query } from '../../../lib/db'
import { getSession } from 'next-auth/client'

const handler: NextApiHandler = async (req, res) => {
    let { 
        name, 
        description,
        date, 
        doors,
        showTime,
        tickets,
        ticketsUrl,
        digital,
        venueName,
        address,
        city,
        province,
        image,
        color,
        socials,
        accessibilityDescription 
    } = JSON.parse(req.body);
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({ message: `This method is not allowed.`})
        }
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: `You must be logged in`})
        }
        if (!name || !date ) {
            return res
                .status(400)
                .json({ message: '`name` and `date` are required' })
        } 

        const slug = await generateSlug(name, 'events');

            const results = await query(
            `
                INSERT INTO events (user_id, slug, name, description, date, doors, show_time, tickets, tickets_url, digital, venue_name, address, city, province, image_id, accent_color, social_links_id, accessibility_description )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [ session.id, slug, name, description, date, doors, showTime, tickets, ticketsUrl, digital, venueName, address, city, province, image, color, socials, accessibilityDescription ]
        )
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler