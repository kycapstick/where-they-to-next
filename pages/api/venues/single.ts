import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { slug } = req.query;
    try {
        if (!slug) {
            return res.status(400).json({ message: '`slug` required' })
        }
        let results = await query(
            `
                SELECT * FROM venues
                WHERE slug = ?
            `,
            slug
        )
        if (results && (results as []).length > 0) {
            results = await Promise.all((results as []).map(async(result: { id, social_links_id, image_id }) => {
                result['accessibility'] = [];
                result['image'] = null;
                result['social_links'] = null;
                const accessibilityIds = await query(
                    `
                    SELECT accessibility_id FROM accessibility_venues
                    WHERE venue_id = ${result.id} 
                    `
                )
                if (accessibilityIds && (accessibilityIds as []).length > 0) {
                    const accessibilities = await Promise.all((accessibilityIds as []).map(async(accessibilityId: { accessibility_id }) => {
                        const accessibility = await query(`
                            SELECT * FROM accessibility
                            WHERE id = ${ accessibilityId.accessibility_id }
                        `)
                        return accessibility[0];
                    }))
                    result['accessibility'] = accessibilities;
                }
                if (result.social_links_id) {
                    const socialLinks = await query(`
                        SELECT * FROM social_links
                        WHERE id = ${result.social_links_id}
                    `)
                    result['social_links'] = socialLinks[0] ? socialLinks[0] : null;
                }
                if (result.image_id) {
                    const image = await query(`
                        SELECT * FROM images
                        WHERE id = ${result.image_id}
                    `)
                    result['image'] = image[0] ? image[0] : null;
                }
                return result;
            }))
        }
        res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
